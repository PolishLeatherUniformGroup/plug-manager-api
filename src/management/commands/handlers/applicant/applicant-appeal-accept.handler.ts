import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { ApplicantAppealAccept } from "../../impl/applicant/applicant-appeal-accept.command";

@CommandHandler(ApplicantAppealAccept)
export class ApplicantAppealAcceptHandler
  implements ICommandHandler<ApplicantAppealAccept>
{
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}
  async execute(command: ApplicantAppealAccept): Promise<any> {
    try {
      var applicant = this.publisher.mergeObjectContext(
        await this.applicantRpository.getById(command.id),
      );
      applicant.acceptAppeal(command.appealAccept);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
