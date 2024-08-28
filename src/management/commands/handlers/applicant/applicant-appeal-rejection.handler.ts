import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAppealRejection } from "../../impl/applicant/applicant-appeal-rejection.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { ApplicantId } from "../../../domain/applicant/applicant-id";


@CommandHandler(ApplicantAppealRejection)
export class ApplicantAppealRejectionHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository   
  ) {}
  async execute(command: ApplicantAppealRejection): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.appealRejection(command.appealDate, command.justification);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
