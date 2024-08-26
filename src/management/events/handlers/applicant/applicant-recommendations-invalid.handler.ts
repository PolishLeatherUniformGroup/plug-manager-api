import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationsNotValid } from "../../impl/applicant/applicant-recommendations-invalid.events";

@ViewUpdaterHandler(ApplicantRecommendationsNotValid)
export class ApplicantRecommendationsNotvalidHandler implements IViewUpdater<ApplicantRecommendationsNotValid> {

    constructor(private readonly repository: Repository<Applicant>) { }

    async handle(event: ApplicantRecommendationsNotValid): Promise<void> {
        var applicant = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["recommendations"]
            });
        applicant.status = event.status;
        applicant.recommendations.forEach(recommendation => {
            recommendation.isValid = false;
        });

        await this.repository.save(applicant);
    }
}