import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantRejectApplication } from "../../impl/applicant/applicant-reject-application.command";

@CommandHandler(ApplicantRejectApplication)
export class ApplicantRejectApplicationHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantRejectApplication): Promise<any> {
    try {
      const applicant = await this.applicantRpository.getById(command.id);
      applicant.rejectApplication(
        command.rejectDate,
        command.justification,
        command.appealDeadline,
      );
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
