import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { ApplicantApplicationRejected } from "../../impl/applicant/applicant-application-rejected.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@EventHandler(ApplicantApplicationRejected)
export class ApplicantApplicationRejectedHandler
  implements IEventHandler
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(envelope: EventEnvelope<ApplicantApplicationRejected>): Promise<void> {
    const event = envelope.payload;
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationProcess"],
    });
    applicant.applicationProcess.rejectDate = event.rejectDate;
    applicant.applicationProcess.rejectionJsutification = event.justification;
    applicant.applicationProcess.appealDeadline = event.appealDeadline;

    let status =new ApplicationStatus();
    status.status = ApplicantStatus.Rejected;
    status.date = new Date();
    status.applicant = applicant;
    status.comment = event.justification;
    applicant.applicationStatuses.push(status);

    await this.repository.save(applicant);
  }
}
