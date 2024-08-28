import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantRejectAppeal } from "../../impl/applicant/applicant-appeal-reject.command";
import { ApplicantId } from "../../../domain/applicant/applicant-id";

@CommandHandler(ApplicantRejectAppeal)
export class ApplicantRejectAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantRejectAppeal): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.rejectAppeal(command.rejectDate, command.justification);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
