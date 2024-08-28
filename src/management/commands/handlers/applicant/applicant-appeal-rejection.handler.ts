import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAppealRejection } from "../../impl/applicant/applicant-appeal-rejection.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";


@CommandHandler(ApplicantAppealRejection)
export class ApplicantAppealRejectionHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository   
  ) {}
  async execute(command: ApplicantAppealRejection): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(command.id);
      applicant.appealRejection(command.appealDate, command.justification);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
