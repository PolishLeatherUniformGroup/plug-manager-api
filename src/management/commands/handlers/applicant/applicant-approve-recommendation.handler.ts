import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantApproveRecommendation } from "../../impl/applicant/applicant-approve-recommendation.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";

@CommandHandler(ApplicantApproveRecommendation)
export class ApplicantApproveRecommendationHandler
  implements ICommandHandler<ApplicantApproveRecommendation>
{
  constructor(
    public readonly applicantRepository: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}
  async execute(command: ApplicantApproveRecommendation): Promise<any> {
    try {
      var applicant = this.publisher.mergeObjectContext(
        await this.applicantRepository.getById(command.id),
      );
      applicant.approveRecommendation(command.recommenderIdOrCard);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
