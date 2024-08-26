import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { ApplicantRejectApplication } from "../../impl/applicant/applicant-reject-application.command";

@CommandHandler(ApplicantRejectApplication)
export class ApplicantRejectApplicationHandler
  implements ICommandHandler<ApplicantRejectApplication>
{
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}
  async execute(command: ApplicantRejectApplication): Promise<any> {
    try {
      var applicant = this.publisher.mergeObjectContext(
        await this.applicantRpository.getById(command.id),
      );
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
