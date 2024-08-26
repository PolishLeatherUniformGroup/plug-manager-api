import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationApproved } from "../../impl/applicant/applicant-recommendation-approved.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantRecommendationApproved)
export class ApplicantRecommendationApprovedHandler
  implements IViewUpdater<ApplicantRecommendationApproved>
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(event: ApplicantRecommendationApproved): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations"],
    });

    var recommendation = applicant.recommendations.find(
      (r) => r.id === event.recommendationId,
    );
    recommendation.isRecommended = true;

    await this.repository.save(applicant);
  }
}
