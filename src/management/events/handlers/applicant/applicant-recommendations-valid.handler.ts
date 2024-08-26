import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { ApplicantRecommendationsValid } from "../../impl/applicant/applicant-recommendations-valid.event";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";

@ViewUpdaterHandler(ApplicantRecommendationsValid)
export class ApplicantRecommendationsValidHandler implements IViewUpdater<ApplicantRecommendationsValid> {

    constructor(private readonly repository: Repository<Applicant>) { }

    async handle(event: ApplicantRecommendationsValid): Promise<void> {
        var applicant = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["recommendations"]
            });
        applicant.status = event.status;
        applicant.recommendations.forEach(recommendation => {
            recommendation.isValid = true;
        });

        await this.repository.save(applicant);
    }
}