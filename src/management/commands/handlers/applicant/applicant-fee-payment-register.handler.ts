import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantRegisterFeePayment } from "../../impl/applicant/applicant-register-fee-payment.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";


@CommandHandler(ApplicantRegisterFeePayment)
export class ApplicantRegisterFeePaymentHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command) {
    try {
      const applicant = await this.applicantRepository.getById(command.id);
      applicant.registerApplicationFeePayment(command.paidDate);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
