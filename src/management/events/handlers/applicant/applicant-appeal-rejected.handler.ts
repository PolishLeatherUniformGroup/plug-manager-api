import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealRejected } from "../../impl/applicant/applicant-appeal-rejected.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@ViewUpdaterHandler(ApplicantAppealRejected)
export class ApplicantAppealRejectedHandler
  implements IViewUpdater<ApplicantAppealRejected> {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) { }

  async handle(event: ApplicantAppealRejected): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess"],
    });
    applicant.applicationProcess.appealRejectDate = event.rejectedDate;
    applicant.applicationProcess.appealDecisionJsutification =
      event.justification;

    let status = new ApplicationStatus();
    status.status = ApplicantStatus.Rejected;
    status.date = new Date();
    status.applicant = applicant;
    status.comment = event.justification;
    applicant.applicationStatuses.push(status);

    await this.repository.save(applicant);
  }
}
