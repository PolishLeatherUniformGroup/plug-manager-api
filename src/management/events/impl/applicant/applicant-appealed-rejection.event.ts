import { StorableEvent } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";


export class ApplicantAppealedRejction extends StorableEvent {
    eventAggregate = Applicant.AGGREGATE_NAME;
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly appealDate: Date,
        public readonly justification: string
    ) {
        super();
    }
}
