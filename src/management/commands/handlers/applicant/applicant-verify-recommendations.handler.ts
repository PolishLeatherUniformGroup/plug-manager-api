import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantVerifyRecommendations } from "../../impl/applicant/applicant-verify-recommendations";

import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { MemberService } from "../../../services/member.service";

@CommandHandler(ApplicantVerifyRecommendations)
export class ApplicantVerifyRecommendationsHandler
  implements ICommandHandler
{
  constructor(
    private mempberService: MemberService,
    private readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}

  async execute(command: ApplicantVerifyRecommendations): Promise<any> {
    try {
      const applicant = await this.applicantRepository.getById(command.id);
      var allValid =
        (await applicant.recommendations
          .map(async (recommendation) => {
            return await this.mempberService.exists(recommendation.cardNumber);
          })
          .filter(async (exists) => !exists).length) == 0;
      applicant.validateRecommendations(allValid);
      applicant.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
