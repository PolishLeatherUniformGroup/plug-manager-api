import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantApproveRecommendation } from "../../impl/applicant/applicant-approve-recommendation.command";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { ApplicantId } from "../../../domain/applicant/applicant-id";
import { Logger } from "@nestjs/common";


@CommandHandler(ApplicantApproveRecommendation)
export class ApplicantApproveRecommendationHandler
  implements ICommandHandler
{
  private readonly logger = new Logger(ApplicantApproveRecommendationHandler.name);
  constructor(
    public readonly applicantRepository: ApplicantAggregateRepository,
   
  ) {}
  async execute(command: ApplicantApproveRecommendation): Promise<any> {
    try {
      this.logger.log(`${ApplicantApproveRecommendation.name} command received command ${JSON.stringify(command)}`);
      const applicant = await this.applicantRepository.getById(ApplicantId.from(command.id));
      this.logger.log(`Applicant found ${applicant.id}`);
      applicant.approveRecommendation(command.recommenderIdOrCard);
      await this.applicantRepository.save(applicant);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
