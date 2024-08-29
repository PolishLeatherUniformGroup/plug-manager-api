
import { Address } from "../address.value-object";
import { Recommendation } from "./recommendation.entity";
import { ApplicationFee } from "./application-fee.entity";
import { ApplicantStatus } from "./applicant-status.enum";
import { ApplicantApplied } from "../../events/impl/applicant/applicant-applied.event";
import { ApplicantRecommendationsValidatedNegative } from "../../events/impl/applicant/applicant-recommendations-invalid.events";
import { ApplicantRecommendationsValidatedPositive } from "src/management/events/impl/applicant/applicant-recommendations-valid.event";
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
import { Aggregate, AggregateRoot } from "@ocoda/event-sourcing";
import { ApplicantId } from "./applicant-id";

@Aggregate({ streamName: "applicant" })
export class Applicant extends AggregateRoot {

  constructor(public readonly id: ApplicantId) {
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

  public static create(
    id: ApplicantId,
    firstName: string,
    lastName: string,
    email: string,
    address: Address,
    birthDate: Date,
    applyDate: Date,
    recommenderCards: string[],
    phoneNumber?: string,
  ): Applicant {
    const applicant = new Applicant(id);
    let appliedEvent = new ApplicantApplied(
      id.value,
      firstName,
      lastName,
      email,
      address,
      birthDate,
      applyDate,
      recommenderCards,
      phoneNumber,
    );
    applicant.applyEvent(appliedEvent);
    return applicant;
  }

  public validateRecommendations(valid: boolean) {
    if (valid) {
      let validEvent = new ApplicantRecommendationsValidatedPositive(
        this.id.value,
        ApplicantStatus.InRecommendation,
      );
      this.applyEvent(validEvent);
    } else {
      let invalidEvent = new ApplicantRecommendationsValidatedNegative(
        this.id.value,
        ApplicantStatus.Cancelled,
      );
      this.applyEvent(invalidEvent);
    }
  }

  public approveRecommendation(idOrCard: string) {
    this.mustBeInStatus(ApplicantStatus.InRecommendation);
    const recommendation = this.getRecommendation(idOrCard);

    let recommendationApproved = new ApplicantRecommendationApproved(
      this.id.value,
      recommendation.cardNumber,
    );
    this.applyEvent(recommendationApproved);    
  }

  public rejectRecommendation(idOrCard: string) {
    this.mustBeInStatus(ApplicantStatus.InRecommendation);
    const recommendation = this.getRecommendation(idOrCard);

    let recommendationRejected = new ApplicantRecommendationRejected(
      this.id.value,
      recommendation.cardNumber,
    );
    this.applyEvent(recommendationRejected);

    let cancelApplication = new ApplicantNotRecommended(this.id.value);
    this.applyEvent(cancelApplication);
  }

  public requestApplicationFeePayment(year:number, amount:number, dueDate:Date) {
    this.mustBeInStatus(ApplicantStatus.InRecommendation);
    let feeRequested = new ApplicantFeePaymentRequested(
      this.id.value,
      year,
      amount,
      dueDate,
    );
    this.applyEvent(feeRequested);
  }

  public registerApplicationFeePayment(paidDate: Date) {
    this.mustBeInStatus(ApplicantStatus.AwaitPayment);
    let feePaid = new ApplicantFeePaid(this.id.value, paidDate);
    this.applyEvent(feePaid);
  }

  public acceptApplication(acceptDate: Date) {
    this.mustBeInStatus(ApplicantStatus.AwaitDecision);
    let accepted = new ApplicantApplicationAccepted(this.id.value, acceptDate);
    this.applyEvent(accepted);
  }

  public rejectApplication(
    rejectDate: Date,
    justification: string,
    appealDeadline: Date,
  ) {
    this.mustBeInStatus(ApplicantStatus.AwaitDecision);
    let rejected = new ApplicantApplicationRejected(
      this.id.value,
      rejectDate,
      justification,
      appealDeadline,
    );
    this.applyEvent(rejected);
  }

  public appealRejection(appealDate: Date, justification: string) {
    this.mustBeInStatus(ApplicantStatus.Rejected);
    if (this._appealDeadline !== undefined) {
      throw new Error("Appeal not possible after rejction of previous appeal");
    }
    if (this.isBeBeforeDeadline(appealDate)) {
      let appeal = new ApplicantAppealRejection(
        this.id.value,
        appealDate,
        justification,
      );
      this.applyEvent(appeal);
    } else {
      let appealOverDeadline = new ApplicantAppealOverDeadline(this.id.value);
      this.applyEvent(appealOverDeadline);
    }
  }

  public acceptAppeal(acceptDate: Date) {
    this.mustBeInStatus(ApplicantStatus.Appealed);
    let accepted = new ApplicantAppealAccepted(this.id.value, acceptDate);
    this.applyEvent(accepted);
  }

  public rejectAppeal(rejectDate: Date, justification: string) {
    this.mustBeInStatus(ApplicantStatus.Appealed);
    let rejected = new ApplicantAppealRejected(
      this.id.value,
      rejectDate,
      justification,
    );
    this.applyEvent(rejected);
  }

  public onApplicantApplied(event: ApplicantApplied) {
    this._firstName = event.firstName;
    this._lastName = event.lastName;
    this._email = event.email;
    this._address = Address.create(event.address.country, event.address.city, event.address.postalCode, event.address.street, event.address.house, event.address.region, event.address.apartment);
    this._applyDate = event.applyDate;
    this._birthDate = event.birthDate;
    this._recommendations = event.recommendations.map(r => (new Recommendation(r)));
    this._phoneNumber = event.phoneNumber;
    this._status = ApplicantStatus.New;
  }

  public onApplicantRecommendationsNotValid(
    event: ApplicantRecommendationsValidatedNegative,
  ) {
    this._status = event.status;
    this._recommendations.every((recommendation) => {
      recommendation.markInvalid();
    });
  }

  public onApplicantRecommendationsValid(event: ApplicantRecommendationsValidatedPositive) {
    this._status = event.status;
    this._recommendations.every((recommendation) => {
      recommendation.markInvalid();
    });
  }

  public onApplicantRecommendationApproved(
    event: ApplicantRecommendationApproved,
  ) {
    const recommendation = this.getRecommendation(event.recommendationId);
    recommendation.markRecommended();
  }

  public onApplicantRecommendationRejected(
    event: ApplicantRecommendationRejected,
  ) {
    const recommendation = this.getRecommendation(event.recommendationId);
    recommendation.markNotRecommended();
    this._status = ApplicantStatus.Rejected;
  }

  public onApplicantFeePaymentRequested(event: ApplicantFeePaymentRequested) {
    this._status = ApplicantStatus.AwaitPayment;
    this._applicationFee = new ApplicationFee(event.amount);
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
    console.log("idOrCard", idOrCard);
    console.log("this._recommendations", this._recommendations);
    const recommendation = this._recommendations.find(
      (recommendation) =>
        (recommendation.cardNumber === idOrCard)
    );
    console.log("recommendation", recommendation);
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }
    return recommendation;
  }

  private isLastNotRecommended(id: string): boolean {
    let otherNotRecommendedCount = this._recommendations.filter(
      (recommendation) =>
        recommendation.cardNumber !== id && recommendation.isRecommended === false,
    ).length;
    return otherNotRecommendedCount === 0;
  }

  private mustBeInStatus(status: ApplicantStatus) {
    if (this._status === status) {
      throw new Error("Applicant has invalid status to perform operation");
    }
  }

  private isBeBeforeDeadline(date: Date): boolean {
    return this._appealDeadline && date < this._appealDeadline;
  }
}
