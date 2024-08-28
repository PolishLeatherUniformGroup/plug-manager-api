import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantVerifyRecommendations } from "../../impl/applicant/applicant-verify-recommendations";

import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { MemberService } from "../../../services/member.service";
import { ApplicantId } from "../../../domain/applicant/applicant-id";
import { Logger } from "@nestjs/common";

@CommandHandler(ApplicantVerifyRecommendations)
export class ApplicantVerifyRecommendationsHandler
  implements ICommandHandler {
  private readonly logger = new Logger(ApplicantVerifyRecommendationsHandler.name);
  constructor(
    private mempberService: MemberService,
    private readonly applicantRepository: ApplicantAggregateRepository,

  ) { }

  async execute(command: ApplicantVerifyRecommendations): Promise<any> {
    try {
      this.logger.log(`${ApplicantVerifyRecommendations.name} command received command`);
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      var allValid =
        (await applicant.recommendations
          .map(async (recommendation) => {
            return await this.mempberService.exists(recommendation.cardNumber);
          })
          .filter(async (exists) => !exists).length) == 0;
      applicant.validateRecommendations(allValid);
      await this.applicantRepository.save(applicant);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
