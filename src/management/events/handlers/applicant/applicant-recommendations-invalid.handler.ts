import { IEventHandler, EventHandler, EventEnvelope } from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantRecommendationsValidatedNegative } from "../../impl/applicant/applicant-recommendations-invalid.events";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@EventHandler(ApplicantRecommendationsValidatedNegative)
export class ApplicantRecommendationsNotvalidHandler
    implements IEventHandler {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(envelope: EventEnvelope<ApplicantRecommendationsValidatedNegative>): Promise<void> {
        const event = envelope.payload;
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations", "applicationStatuses"],
        });
        let status = new ApplicationStatus();
        status.status = event.status;
        status.date = new Date();
        status.applicant = applicant;
        applicant.recommendations.forEach((recommendation) => {
            recommendation.isValid = false;
        });
        applicant.applicationStatuses.push(status);

        await this.repository.save(applicant);
    }
}
