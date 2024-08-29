import { CommandHandler, ICommand, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantRequestFeePayment } from "../../impl/applicant/applican-request-fee-payment.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { SettingsService } from "../../../services/settings.service";
import { ApplicantId } from "../../../domain/applicant/applicant-id";
import { Logger } from "@nestjs/common";

@CommandHandler(ApplicantRequestFeePayment)
export class ApplicantRequestFeePaymentHandler implements ICommandHandler<ApplicantRequestFeePayment> {
    private readonly logger = new Logger(ApplicantRequestFeePaymentHandler.name);
    constructor(
        private readonly applicantRepository: ApplicantAggregateRepository,
        private readonly settingsService: SettingsService
    ) {}
    async execute(command: ApplicantRequestFeePayment): Promise<any> {
        try {
            const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
            const baseFee = await this.settingsService.getYearlyFee(command.year);
            const month = new Date().getMonth();
            const feeAmount = baseFee * ((12 - month) / 12);
            applicant.requestApplicationFeePayment(command.year, feeAmount, new Date(new Date().getDate() + 14));
            await this.applicantRepository.save(applicant);
          } catch (error) {
            this.logger.error(error);
            throw error;
          }
    }


}