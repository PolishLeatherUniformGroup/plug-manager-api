import { IEventHandler, EventHandler, EventEnvelope, CommandBus} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationApproved } from "../../impl/applicant/applicant-recommendation-approved.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicantRequestFeePayment } from "../../../commands/impl/applicant/applicant-request-fee-payment.command";
import { Logger } from "@nestjs/common";

@EventHandler(ApplicantRecommendationApproved)
export class ApplicantRecommendationApprovedHandler
  implements IEventHandler
{
  private readonly logger = new Logger(ApplicantRecommendationApprovedHandler.name);
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

    this.logger.log(`Applicant found ${applicant.id}`);
    this.logger.log(`Recommendation id ${applicant.recommendations}`);

    var recommendation = applicant.recommendations.find(
      (r) => r.cardNumber === event.recommendationId,
    );
    this.logger.log(`Recommendation found ${recommendation}`);
    recommendation.isRecommended = true;


    await this.repository.save(applicant);

    if(applicant.recommendations.every((r) => (r.isRecommended))){
      const command = new ApplicantRequestFeePayment(applicant.id, new Date().getFullYear());
      await this.commandBus.execute<ApplicantRequestFeePayment>(command);
    }
  }
}
