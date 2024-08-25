import { ICommandHandler } from "@nestjs/cqrs";
import { ApplicantRegisterFeePayment } from "../../impl/applicant/applicant-register-fee-payment.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";

export class ApplicantRegisterFeePaymentHandler implements ICommandHandler<ApplicantRegisterFeePayment> {
    constructor(private readonly applicantRepository: ApplicantAggregateRepository,
        private readonly publisher: StoreEventPublisher) {

    }
    async execute(command) {
        try {
            var applicant = this.publisher.mergeObjectContext(await this.applicantRepository.getById(command.id));
            applicant.registerApplicationFeePayment(command.paidDate);
            applicant.commit();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}