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
      let validationResult: boolean[] = [];
      applicant.recommendations
        .forEach(async (recommendation) => {
          this.logger.log(`Checking recommendation ${recommendation.cardNumber}`);
          validationResult.push(await this.mempberService.exists(recommendation.cardNumber));
        });
      const allValid = validationResult.every((v) => v);
      this.logger.log(`All recommendations are ${allValid ? 'valid' : 'invalid'}`);
      applicant.validateRecommendations(allValid);
      await this.applicantRepository.save(applicant);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
