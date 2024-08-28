import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantApproveRecommendation } from "../../impl/applicant/applicant-approve-recommendation.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";


@CommandHandler(ApplicantApproveRecommendation)
export class ApplicantApproveRecommendationHandler
  implements ICommandHandler
{
  constructor(
    public readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantApproveRecommendation): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(command.id);
      applicant.approveRecommendation(command.recommenderIdOrCard);
      applicant.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
