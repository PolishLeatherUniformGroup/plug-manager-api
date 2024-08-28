import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAcceptApplication } from "../../impl/applicant/applicant-accept-application.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { ApplicantId } from "../../../domain/applicant/applicant-id";


@CommandHandler(ApplicantAcceptApplication)
export class ApplicantAcceptApplicationHandler
  implements ICommandHandler {
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
  ) { }
  async execute(command: ApplicantAcceptApplication): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.acceptApplication(command.acceptDate);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
