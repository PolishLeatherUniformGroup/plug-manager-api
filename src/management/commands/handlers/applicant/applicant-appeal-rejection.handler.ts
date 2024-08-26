import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantAppealRejection } from "../../impl/applicant/applicant-appeal-rejection.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";

@CommandHandler(ApplicantAppealRejection)
export class ApplicantAppealRejectionHandler
  implements ICommandHandler<ApplicantAppealRejection>
{
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}
  async execute(command: ApplicantAppealRejection): Promise<any> {
    try {
      var applicant = this.publisher.mergeObjectContext(
        await this.applicantRepository.getById(command.id),
      );
      applicant.appealRejection(command.appealDate, command.justification);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
