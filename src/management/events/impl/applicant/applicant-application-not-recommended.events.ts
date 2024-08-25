import { StorableEvent } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";


export class ApplicantNotRecommended extends StorableEvent {
    eventAggregate = Applicant.AGGREGATE_NAME;
    eventVersion = 1;

    constructor(
        public readonly id: string,
    ) {
        super();
    }
}
