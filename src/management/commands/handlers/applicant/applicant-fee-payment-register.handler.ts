import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantRegisterFeePayment } from "../../impl/applicant/applicant-register-fee-payment.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { Logger } from "@nestjs/common";
import { ApplicantId } from "../../../domain/applicant/applicant-id";


@CommandHandler(ApplicantRegisterFeePayment)
export class ApplicantRegisterFeePaymentHandler
  implements ICommandHandler
{
  private readonly logger = new Logger(ApplicantRegisterFeePaymentHandler.name);
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command :ApplicantRegisterFeePayment): Promise<void> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.registerApplicationFeePayment(command.paidDate);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
