import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { ApplicantRejectAppeal } from "../../impl/applicant/applicant-appeal-reject.command";

@CommandHandler(ApplicantRejectAppeal)
export class ApplicantRejectAppealHandler
  implements ICommandHandler<ApplicantRejectAppeal>
{
  constructor(
    private readonly applicantRpository: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}
  async execute(command: ApplicantRejectAppeal): Promise<any> {
    try {
      var applicant = this.publisher.mergeObjectContext(
        await this.applicantRpository.getById(command.id),
      );
      applicant.rejectAppeal(command.rejectDate, command.justification);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
