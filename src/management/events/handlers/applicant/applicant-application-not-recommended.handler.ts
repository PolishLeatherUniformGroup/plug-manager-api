import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantNotRecommended } from "../../impl/applicant/applicant-application-not-recommended.events";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantNotRecommended)
export class ApplicantNotRecommendedHandler
    implements IViewUpdater<ApplicantNotRecommended> {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(event: ApplicantNotRecommended): Promise<void> {
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations"],
        });
        applicant.status = ApplicantStatus.Cancelled;

        await this.repository.save(applicant);
    }
}
