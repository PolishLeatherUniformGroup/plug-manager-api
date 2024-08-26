import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealRejected } from "../../impl/applicant/applicant-appeal-rejected.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantAppealRejected)
export class ApplicantAppealRejectedHandler
  implements IViewUpdater<ApplicantAppealRejected>
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(event: ApplicantAppealRejected): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess"],
    });
    applicant.status = ApplicantStatus.Rejected;
    applicant.applicationProcess.appealRejectDate = event.rejectedDate;
    applicant.applicationProcess.appealDecisionJsutification =
      event.justification;

    await this.repository.save(applicant);
  }
}
