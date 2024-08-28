import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantRejectRecommendation } from "../../impl/applicant/applicant-reject-recommendation.comand";

@CommandHandler(ApplicantRejectRecommendation)
export class ApplicantRejectRecommendationHandler
  implements ICommandHandler
{
  constructor(
    public readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantRejectRecommendation): Promise<any> {
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
