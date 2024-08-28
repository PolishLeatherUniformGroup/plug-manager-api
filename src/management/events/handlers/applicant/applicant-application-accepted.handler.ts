import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantApplicationAccepted } from "../../impl/applicant/applicant-application-accepted.event";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@EventHandler(ApplicantApplicationAccepted)
export class ApplicantApplicationAcceptedHandler
  implements IEventHandler
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(envelope: EventEnvelope<ApplicantApplicationAccepted>): Promise<void> {
    const event = envelope.payload;
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
