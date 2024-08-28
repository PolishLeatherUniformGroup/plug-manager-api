import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAcceptApplication } from "../../impl/applicant/applicant-accept-application.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";


@CommandHandler(ApplicantAcceptApplication)
export class ApplicantAcceptApplicationHandler
  implements ICommandHandler {
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
  ) { }
  async execute(command: ApplicantAcceptApplication): Promise<any> {
    try {
      const applicant = await this.applicantRpository.getById(command.id);
      applicant.acceptApplication(command.acceptDate);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
