import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { ApplicantRecommendationsValid } from "../../impl/applicant/applicant-recommendations-valid.event";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantNotRecommended } from "../../impl/applicant/applicant-application-not-recommended.events";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";

@ViewUpdaterHandler(ApplicantNotRecommended)
export class ApplicantNotRecommendedHandler implements IViewUpdater<ApplicantNotRecommended> {

    constructor(private readonly repository: Repository<Applicant>) { }

    async handle(event: ApplicantNotRecommended): Promise<void> {
        var applicant = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["recommendations"]
            });
        applicant.status = ApplicantStatus.Cancelled;


        await this.repository.save(applicant);
    }
}