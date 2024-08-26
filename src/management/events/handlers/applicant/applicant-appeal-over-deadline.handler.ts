import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealOverDeadline } from "../../impl/applicant/applicant-appeal-over-deadline.event";
import { InjectRepository } from "@nestjs/typeorm";

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
    applicant.status = ApplicantStatus.Rejected;
    applicant.applicationProcess.appealRejectDate =
      applicant.applicationProcess.appealDeadline;
    await this.repository.save(applicant);
  }
}
