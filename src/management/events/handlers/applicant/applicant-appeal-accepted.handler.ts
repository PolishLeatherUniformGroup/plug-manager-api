import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantAppealAccepted } from "../../impl/applicant/applicant-appeal-accepted.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";
import { EventEnvelope, EventHandler, IEventHandler } from "@ocoda/event-sourcing";

@EventHandler(ApplicantAppealAccepted)
export class ApplicantAppealAcceptedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) { }

  async handle(envelope: EventEnvelope<ApplicantAppealAccepted>): Promise<void> {
    const event = envelope.payload;
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess", "applicationStatuses"],
    });
    applicant.applicationProcess.appealAcceptDate = event.acceptedDate;

    let status = new ApplicationStatus();
    status.status = ApplicantStatus.Accepted;
    status.date = new Date();
    status.applicant = applicant;
    status.comment = "Odwołanie zaakceptowane";
    applicant.applicationStatuses.push(status);

    await this.repository.save(applicant);
  }
}
