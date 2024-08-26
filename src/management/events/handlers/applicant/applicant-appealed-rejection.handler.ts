import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealedRejection } from "../../impl/applicant/applicant-appealed-rejection.event";

@ViewUpdaterHandler(ApplicantAppealedRejection)
export class ApplicantAppealedRejectionHandler implements IViewUpdater<ApplicantAppealedRejection> {

    constructor(private readonly repository: Repository<Applicant>) { }

    async handle(event: ApplicantAppealedRejection): Promise<void> {
        var applicant = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["recommendations", "applicationProcess"]
            });
        applicant.status = ApplicantStatus.Rejected;
        applicant.applicationProcess.appealDate = event.appealDate;
        applicant.applicationProcess.appealJustification = event.justification;

        await this.repository.save(applicant);
    }
}