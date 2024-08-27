import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantApplicationAccepted } from "../../impl/applicant/applicant-application-accepted.event";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@ViewUpdaterHandler(ApplicantApplicationAccepted)
export class ApplicantApplicationAcceptedHandler
  implements IViewUpdater<ApplicantApplicationAccepted>
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(event: ApplicantApplicationAccepted): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess"],
    });
    applicant.applicationProcess.acceptDate = event.acceptedDate;

    let status =new ApplicationStatus();
    status.status = ApplicantStatus.Accepted;
    status.date = new Date();
    status.applicant = applicant;
    applicant.applicationStatuses.push(status);

    await this.repository.save(applicant);
  }
}
