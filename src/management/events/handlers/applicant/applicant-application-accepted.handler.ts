import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantApplicationAccepted } from "../../impl/applicant/applicant-application-accepted.event";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { InjectRepository } from "@nestjs/typeorm";

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
    applicant.status = ApplicantStatus.Accepted;
    applicant.applicationProcess.acceptDate = event.acceptedDate;

    await this.repository.save(applicant);
  }
}
