import { StorableEvent } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";


export class ApplicantApplicationRejected extends StorableEvent {
    eventAggregate = Applicant.AGGREGATE_NAME;
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly rejectDate: Date,
        public readonly justification: string,
        public readonly appealDeadline: Date
    ) {
        super();
    }
}
