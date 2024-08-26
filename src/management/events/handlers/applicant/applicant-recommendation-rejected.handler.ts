import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Recommendation } from "../../../model/applicants/recommendation.model";
import { ApplicantRecommendationRejected } from "../../impl/applicant/applicant-recommendation-rejected.event";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";

@ViewUpdaterHandler(ApplicantRecommendationRejected)
export class ApplicantRecommendationRejectedHandler implements IViewUpdater<ApplicantRecommendationRejected> {

    constructor(private readonly repository: Repository<Recommendation>) { }

    async handle(event: ApplicantRecommendationRejected): Promise<void> {
        var recommendation = await this.repository
            .findOne({
                where: { id: event.recommendationId },
                relations: ["user"]
            });
        recommendation.isRecommended = false;

        await this.repository.save(recommendation);
    }
}