import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantAppealAccept } from "../../impl/applicant/applicant-appeal-accept.command";

@CommandHandler(ApplicantAppealAccept)
export class ApplicantAppealAcceptHandler
  implements ICommandHandler
{
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantAppealAccept): Promise<any> {
    try {
      const applicant = await this.applicantRpository.getById(command.id);
      applicant.acceptAppeal(command.appealAccept);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
