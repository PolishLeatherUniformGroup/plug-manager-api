import { IEventHandler, EventHandler, EventEnvelope, CommandBus} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationApproved } from "../../impl/applicant/applicant-recommendation-approved.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicantRequestFeePayment } from "../../../commands/impl/applicant/applican-request-fee-payment.command";

@EventHandler(ApplicantRecommendationApproved)
export class ApplicantRecommendationApprovedHandler
  implements IEventHandler
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
    private readonly commandBus: CommandBus,
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

    if(applicant.recommendations.every((r) => (r.isRecommended))){
      const command = new ApplicantRequestFeePayment(applicant.id, new Date().getFullYear());
      await this.commandBus.execute(command);
    }
  }
}
