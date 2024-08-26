import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { ApplicantRecommendationsValid } from "../../impl/applicant/applicant-recommendations-valid.event";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationApproved } from "../../impl/applicant/applicant-recommendation-approved.event";
import { Recommendation } from "../../../model/applicants/recommendation.model";

@ViewUpdaterHandler(ApplicantRecommendationApproved)
export class ApplicantRecommendationApprovedHandler implements IViewUpdater<ApplicantRecommendationApproved> {

    constructor(private readonly repository: Repository<Recommendation>) { }

    async handle(event: ApplicantRecommendationApproved): Promise<void> {
        var recommendation = await this.repository
            .findOne({
                where: { id: event.recommendationId },
                relations: ["user"]
            });
        recommendation.isRecommended = true;

        await this.repository.save(recommendation);
    }
}