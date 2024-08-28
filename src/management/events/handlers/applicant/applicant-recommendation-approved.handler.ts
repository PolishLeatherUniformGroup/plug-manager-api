import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationApproved } from "../../impl/applicant/applicant-recommendation-approved.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(ApplicantRecommendationApproved)
export class ApplicantRecommendationApprovedHandler
  implements IEventHandler
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(envelope: EventEnvelope<ApplicantRecommendationApproved>): Promise<void> {
    const event = envelope.payload;
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations"],
    });

    var recommendation = applicant.recommendations.find(
      (r) => r.id === event.recommendationId,
    );
    recommendation.isRecommended = true;

    await this.repository.save(applicant);
  }
}
