import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { ApplicantRecommendationRejected } from "../../impl/applicant/applicant-recommendation-rejected.event";
import { Applicant } from "../../../model/applicants/applicant.model";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(ApplicantRecommendationRejected)
export class ApplicantRecommendationRejectedHandler
    implements IEventHandler {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(envelope: EventEnvelope< ApplicantRecommendationRejected>): Promise<void> {
        const event = envelope.payload;
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations"],
        });
        applicant.recommendations.find(
            (r) => r.id === event.recommendationId,
        ).isRecommended = false;

        await this.repository.save(applicant);
    }
}
