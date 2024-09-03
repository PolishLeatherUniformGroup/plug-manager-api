import { IEventHandler, EventHandler, EventEnvelope } from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantNotRecommended } from "../../impl/applicant/applicant-application-not-recommended.events";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

@EventHandler(ApplicantNotRecommended)
export class ApplicantNotRecommendedHandler
    implements IEventHandler {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(envelope: EventEnvelope<ApplicantNotRecommended>): Promise<void> {
        const event = envelope.payload;
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations", "applicationStatuses"],
        });
        let status = new ApplicationStatus();
        status.status = ApplicantStatus.Cancelled;
        status.date = new Date();
        status.applicant = applicant;
        status.comment = "Wniosek nie uzyskał pozytywnej rekomendacji";
        applicant.applicationStatuses.push(status);

        await this.repository.save(applicant);
    }
}
