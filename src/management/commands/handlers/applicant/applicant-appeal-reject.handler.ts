import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantRejectAppeal } from "../../impl/applicant/applicant-appeal-reject.command";

@CommandHandler(ApplicantRejectAppeal)
export class ApplicantRejectAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantRejectAppeal): Promise<any> {
    try {
      const applicant = await this.applicantRpository.getById(command.id);
      applicant.rejectAppeal(command.rejectDate, command.justification);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
