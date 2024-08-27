import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationsNotValid } from "../../impl/applicant/applicant-recommendations-invalid.events";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@ViewUpdaterHandler(ApplicantRecommendationsNotValid)
export class ApplicantRecommendationsNotvalidHandler
    implements IViewUpdater<ApplicantRecommendationsNotValid> {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(event: ApplicantRecommendationsNotValid): Promise<void> {
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations"],
        });
        let status = new ApplicationStatus();
        status.status = event.status;
        status.date = new Date();
        status.applicant = applicant;
        applicant.recommendations.forEach((recommendation) => {
            recommendation.isValid = false;
        });
        applicant.applicationStatuses.push(status);

        await this.repository.save(applicant);
    }
}
