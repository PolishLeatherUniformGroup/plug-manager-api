import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantRejectApplication } from "../../impl/applicant/applicant-reject-application.command";
import { ApplicantId } from "../../../domain/applicant/applicant-id";

@CommandHandler(ApplicantRejectApplication)
export class ApplicantRejectApplicationHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantRejectApplication): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.rejectApplication(
        command.rejectDate,
        command.justification,
        command.appealDeadline,
      );
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
