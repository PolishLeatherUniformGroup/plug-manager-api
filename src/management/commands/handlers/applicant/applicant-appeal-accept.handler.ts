import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantAppealAccept } from "../../impl/applicant/applicant-appeal-accept.command";
import { ApplicantId } from "../../../domain/applicant/applicant-id";

@CommandHandler(ApplicantAppealAccept)
export class ApplicantAppealAcceptHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantAppealAccept): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.acceptAppeal(command.appealAccept);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
