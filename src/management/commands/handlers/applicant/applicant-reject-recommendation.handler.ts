import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

import { ApplicantRejectRecommendation } from "../../impl/applicant/applicant-reject-recommendation.comand";
import { ApplicantId } from "../../../domain/applicant/applicant-id";

@CommandHandler(ApplicantRejectRecommendation)
export class ApplicantRejectRecommendationHandler
  implements ICommandHandler
{
  constructor(
    public readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantRejectRecommendation): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      applicant.approveRecommendation(command.recommenderIdOrCard);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
