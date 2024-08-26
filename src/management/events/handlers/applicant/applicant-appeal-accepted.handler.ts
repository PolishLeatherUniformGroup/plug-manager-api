import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealAccepted } from "../../impl/applicant/applicant-appeal-accepted.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantAppealAccepted)
export class ApplicantAppealAcceptedHandler
  implements IViewUpdater<ApplicantAppealAccepted>
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(event: ApplicantAppealAccepted): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess"],
    });
    applicant.status = ApplicantStatus.Accepted;
    applicant.applicationProcess.appealAcceptDate = event.acceptedDate;

    await this.repository.save(applicant);
  }
}
