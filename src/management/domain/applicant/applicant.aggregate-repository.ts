import { EventStore } from "event-sourcing-nestjs";
import { IAggregateRepository } from "../../shared/domain/aggregate-repository";
import { Applicant } from "./applicant.aggregate";

export class ApplicantAggregateRepository implements IAggregateRepository<Applicant> {
    constructor(private readonly eventStore: EventStore) { }

    public async getById(id: string): Promise<Applicant> {
        const memberAggregate = new Applicant(id);
        memberAggregate.loadFromHistory(
            await this.eventStore.getEvents(Applicant.AGGREGATE_NAME, id),
        );
        return memberAggregate;
    }

}