import { AggregateRoot } from "@nestjs/cqrs";
import { Address } from "../address.value-object";
import { Recommendation } from "./recommendation.entity";
import { ApplicationFee } from "./application-fee.entity";
import { ApplicantStatus } from './applicant-status.enum';
import { ApplicantApplied } from "../../events/impl/applicant/applicant-applied.event";
import { v4 as uuidv4 } from 'uuid';
import { ApplicantRecommendationsNotValid } from "../../events/impl/applicant/applicant-recommendations-invalid.events";
import { ApplicantRecommendationsValid } from "src/management/events/impl/applicant/applicant-recommendations-valid.event";
import { ApplicantRecommendationApproved } from "../../events/impl/applicant/applicant-recommendation-approved.event";
import { ApplicantRecommendationRejected } from "../../events/impl/applicant/applicant-recommendation-rejected.event";
import { ApplicantFeePaymentRequested } from "../../events/impl/applicant/applicant-fee-payment-requested.event";
import { ApplicantNotRecommended } from "../../events/impl/applicant/applicant-application-not-recommended.events";
import { ApplicantFeePaid } from "../../events/impl/applicant/applicant-fee-paid.event";
import { ApplicantApplicationAccepted } from "../../events/impl/applicant/applicant-application-accepted.event";
import { ApplicantApplicationRejected } from "../../events/impl/applicant/applicant-application-rejected.event";
import { ApplicantAppealedRejection as ApplicantAppealRejection } from "../../events/impl/applicant/applicant-appealed-rejection.event";
import { ApplicantAppealOverDeadline } from "../../events/impl/applicant/applicant-appeal-over-deadline.event";
import { ApplicantAppealAccepted } from "../../events/impl/applicant/applicant-appeal-accepted.event";
import { ApplicantAppealRejected } from "../../events/impl/applicant/applicant-appeal-rejected.event";

export class Applicant extends AggregateRoot {
    public static readonly AGGREGATE_NAME = 'applicant';

    constructor(public readonly id: string) {
        super();
    }

    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumber?: string;
    private _address: Address;
    private _applyDate: Date;
    private _birthDate: Date;
    private _recommendations: Recommendation[];
    private _applicationFee: ApplicationFee;
    private _status: ApplicantStatus;
    private _appealDeadline?: Date;

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get email(): string {
        return this._email;
    }

    get phoneNumber(): string | undefined {
        return this._phoneNumber;
    }

    get address(): Address {
        return this._address;
    }

    get applyDate(): Date {
        return this._applyDate;
    }

    get birthDate(): Date {
        return this._birthDate;
    }

    get recommendations(): Recommendation[] {
        return this._recommendations;
    }

    get applicationFee(): ApplicationFee {
        return this._applicationFee;
    }

    get status(): ApplicantStatus {
        return this._status;
    }

    get appealDeadline(): Date | undefined {
        return this._appealDeadline;
    }

    public static create(id: string, firstName: string, lastName: string, email: string, address: Address, birthDate: Date, applyDate: Date, recommenderCards: string[], phoneNumber?: string): Applicant {
        const applicant = new Applicant(id);
        let recommenders = recommenderCards.map((card) => (new Recommendation(uuidv4(), card)));
        let appliedEvent = new ApplicantApplied(id, firstName, lastName, email, address, birthDate, applyDate, recommenders, phoneNumber);
        applicant.apply(appliedEvent);
        return applicant;
    }

    public validateRecommendations(valid: boolean) {
        this.mustBeInStatus(ApplicantStatus.New);
        if (valid) {
            let validEvent = new ApplicantRecommendationsValid(this.id, ApplicantStatus.InRecommendation);
            this.apply(validEvent);
        } else {
            let invalidEvent = new ApplicantRecommendationsNotValid(this.id, ApplicantStatus.Cancelled);
            this.apply(invalidEvent);
        }
    }

    public approveRecommendation(idOrCard: string) {
        this.mustBeInStatus(ApplicantStatus.InRecommendation);
        const recommendation = this.getRecommendation(idOrCard);

        let recommendationApproved = new ApplicantRecommendationApproved(this.id, recommendation.id);
        this.apply(recommendationApproved);
        if (this.isLastNotRecommended(recommendation.id)) {
            let paymentRequest = new ApplicantFeePaymentRequested(this.id, this.applicationFee.amount);
            this.apply(paymentRequest);
        }
    }

    public rejectRecommendation(idOrCard: string) {
        this.mustBeInStatus(ApplicantStatus.InRecommendation);
        const recommendation = this.getRecommendation(idOrCard);

        let recommendationRejected = new ApplicantRecommendationRejected(this.id, recommendation.id);
        this.apply(recommendationRejected);

        let cancelApplication = new ApplicantNotRecommended(this.id);
        this.apply(cancelApplication);
    }

    public registerApplicationFeePayment(paidDate: Date) {
        this.mustBeInStatus(ApplicantStatus.AwaitPayment);
        let feePaid = new ApplicantFeePaid(this.id, paidDate);
        this.apply(feePaid);
    }

    public acceptApplication(acceptDate: Date) {
        this.mustBeInStatus(ApplicantStatus.AwaitDecision);
        let accepted = new ApplicantApplicationAccepted(this.id, acceptDate);
        this.apply(accepted);
    }

    public rejectApplication(rejectDate: Date, justification: string, appealDeadline: Date) {
        this.mustBeInStatus(ApplicantStatus.AwaitDecision);
        let rejected = new ApplicantApplicationRejected(this.id, rejectDate, justification, appealDeadline);
        this.apply(rejected)
    }

    public appealRejection(appealDate: Date, justification: string) {
        this.mustBeInStatus(ApplicantStatus.Rejected);
        if (this._appealDeadline !== undefined) {
            throw new Error('Appeal not possible after rejction of previous appeal');
        }
        if (this.isBeBeforeDeadline(appealDate)) {
            let appeal = new ApplicantAppealRejection(this.id, appealDate, justification);
            this.apply(appeal);
        } else {
            let appealOverDeadline = new ApplicantAppealOverDeadline(this.id);
            this.apply(appealOverDeadline);
        }
    }

    public acceptAppeal(acceptDate: Date) {
        this.mustBeInStatus(ApplicantStatus.Appealed);
        let accepted = new ApplicantAppealAccepted(this.id, acceptDate);
        this.apply(accepted);
    }

    public rejectAppeal(rejectDate: Date, justification: string) {
        this.mustBeInStatus(ApplicantStatus.Appealed);
        let rejected = new ApplicantAppealRejected(this.id, rejectDate, justification);
        this.apply(rejected);
    }

    public onApplicantApplied(event: ApplicantApplied) {
        this._firstName = event.firstName;
        this._lastName = event.lastName;
        this._email = event.email;
        this._address = event.address;
        this._applyDate = event.applyDate;
        this._birthDate = event.birthDate;
        this._recommendations = event.recommendations;
        this._phoneNumber = event.phoneNumber;
        this._status = ApplicantStatus.New;
    }

    public onApplicantRecommendationsNotValid(event: ApplicantRecommendationsNotValid) {
        this._status = event.status;
        this._recommendations.every((recommendation) => {
            recommendation.markInvalid();
        });
    }

    public onApplicantRecommendationsValid(event: ApplicantRecommendationsValid) {
        this._status = event.status;
        this._recommendations.every((recommendation) => {
            recommendation.markInvalid();
        });
    }

    public onApplicantRecommendationApproved(event: ApplicantRecommendationApproved) {
        const recommendation = this.getRecommendation(event.recommendationId);
        recommendation.markRecommended();
    }

    public onApplicantRecommendationRejected(event: ApplicantRecommendationRejected) {
        const recommendation = this.getRecommendation(event.recommendationId);
        recommendation.markNotRecommended();
        this._status = ApplicantStatus.Rejected;
    }

    public onApplicantFeePaymentRequested(event: ApplicantFeePaymentRequested) {
        this._status = ApplicantStatus.AwaitPayment;
    }

    public onApplicantNotRecommended(event: ApplicantNotRecommended) {
        this._status = ApplicantStatus.Cancelled;
    }

    public onApplicantFeePaid(event: ApplicantFeePaid) {
        this._status = ApplicantStatus.AwaitDecision;
        this._applicationFee.markPaid(event.paidDate);
    }

    public onApplicantApplicationAccepted(event: ApplicantApplicationAccepted) {
        this._status = ApplicantStatus.Accepted;
    }

    public onApplicantApplicationReject(event: ApplicantApplicationRejected) {
        this._status = ApplicantStatus.Rejected;
        this._appealDeadline = event.appealDeadline;
    }

    public onApplicantAppealedRejection(event: ApplicantAppealRejection) {
        this._status = ApplicantStatus.Appealed;
    }

    public onApplicantAppealOverDeadline(event: ApplicantAppealOverDeadline) {
        this._status = ApplicantStatus.Cancelled;
    }

    public onApplicantAppealAccepted(event: ApplicantAppealAccepted) {
        this._status = ApplicantStatus.Accepted;
    }

    public onApplicantAppealRejected(event: ApplicantAppealRejected) {
        this._status = ApplicantStatus.Rejected;
    }

    private getRecommendation(idOrCard: string): Recommendation {
        const recommendations = this._recommendations.filter((recommendation) => recommendation.id === idOrCard || recommendation.cardNumber === idOrCard);
        if (recommendations.length == 0) {
            throw new Error('Recommendation not found');
        }
        if (recommendations.length > 1) {
            throw new Error('Multiple recommendations found');
        }
        return recommendations[0];
    }

    private isLastNotRecommended(id: string): boolean {
        let otherNotRecommendedCount = this._recommendations.filter((recommendation) => recommendation.id !== id && recommendation.isRecommended === false).length;
        return otherNotRecommendedCount === 0;
    }

    private mustBeInStatus(status: ApplicantStatus) {
        if (this._status !== status) {
            throw new Error('Applicant has invalid status to perform operation');
        }
    }

    private isBeBeforeDeadline(date: Date): boolean {
        return this._appealDeadline && date < this._appealDeadline;
    }
}