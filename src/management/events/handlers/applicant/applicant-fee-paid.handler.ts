import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaid } from "../../impl/applicant/applicant-fee-paid.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(ApplicantFeePaid)
export class ApplicantFeePaidHandler implements IEventHandler {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(envelope: EventEnvelope<ApplicantFeePaid>): Promise<void> {
        const event = envelope.payload;
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations"],
        });
        applicant.applicationFee.paidAmount = applicant.applicationFee.paidAmount;
        applicant.applicationFee.paidDate = event.paidDate;

        await this.repository.save(applicant);
    }
}
