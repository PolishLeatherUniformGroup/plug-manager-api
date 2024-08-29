import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { ApplicantRecommendationsValidatedPositive } from "../../impl/applicant/applicant-recommendations-valid.event";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@EventHandler(ApplicantRecommendationsValidatedPositive)
export class ApplicantRecommendationsValidHandler
  implements IEventHandler {
  constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant>) { }

  async handle( envelope: EventEnvelope<ApplicantRecommendationsValidatedPositive>): Promise<void> {
    const event = envelope.payload;
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationStatuses"],
    });
    let status =new ApplicationStatus();
    status.status = event.status;
    status.date = new Date();
    status.applicant = applicant;

    applicant.applicationStatuses.push(status);
    applicant.recommendations.forEach((recommendation) => {
      recommendation.isValid = true;
    });

    await this.repository.save(applicant);
  }
}
