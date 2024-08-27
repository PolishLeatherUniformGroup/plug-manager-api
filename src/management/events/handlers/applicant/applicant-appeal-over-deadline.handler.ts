import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealOverDeadline } from "../../impl/applicant/applicant-appeal-over-deadline.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@ViewUpdaterHandler(ApplicantAppealOverDeadline)
export class ApplicantAppealOverDeadlineHandler
  implements IViewUpdater<ApplicantAppealOverDeadline>
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(event: ApplicantAppealOverDeadline): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess"],
    });

    applicant.applicationProcess.appealRejectDate =
      applicant.applicationProcess.appealDeadline;

      let status =new ApplicationStatus();
      status.status = ApplicantStatus.Accepted;
      status.date = new Date();
      status.applicant = applicant;
      status.comment = "Odwołanie odrzucone z powodu przekroczenia terminu";
      applicant.applicationStatuses.push(status);
    await this.repository.save(applicant);
  }
}
