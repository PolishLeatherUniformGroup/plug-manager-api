import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaid } from "../../impl/applicant/applicant-fee-paid.event";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@nestjs/common";

@EventHandler(ApplicantFeePaid)
export class ApplicantFeePaidHandler implements IEventHandler {
    private readonly logger = new Logger(ApplicantFeePaidHandler.name);
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(envelope: EventEnvelope<ApplicantFeePaid>): Promise<void> {
        this.logger.log(`Handling event: ${ApplicantFeePaid.name}`);
        const event = envelope.payload;
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations", "applicationFee"],
        });

        this.logger.log(`Applicant: ${applicant.id} found`);
        this.logger.log(`ApplicantFee: ${JSON.stringify(applicant.applicationFee)} found`);
        applicant.applicationFee.paidAmount = applicant.applicationFee.dueAmount;
        applicant.applicationFee.paidDate = event.paidDate;

        await this.repository.save(applicant);
    }
}
