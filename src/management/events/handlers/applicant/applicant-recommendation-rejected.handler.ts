import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { ApplicantRecommendationRejected } from "../../impl/applicant/applicant-recommendation-rejected.event";
import { Applicant } from "../../../model/applicants/applicant.model";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantRecommendationRejected)
export class ApplicantRecommendationRejectedHandler
    implements IViewUpdater<ApplicantRecommendationRejected> {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(event: ApplicantRecommendationRejected): Promise<void> {
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations"],
        });
        applicant.recommendations.find(
            (r) => r.id === event.recommendationId,
        ).isRecommended = false;

        await this.repository.save(applicant);
    }
}
