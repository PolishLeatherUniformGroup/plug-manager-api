import { EventStore } from "event-sourcing-nestjs";
import { IAggregateRepository } from "../../shared/domain/aggregate-repository";
import { Member } from "./member.aggregate";

export class MemberAggregateRepository implements IAggregateRepository<Member> {

    constructor(private readonly eventStore: EventStore) { }

    async getById(id: string): Promise<Member> {
        const memberAggregate = new Member(id);
        memberAggregate.loadFromHistory(
            await this.eventStore.getEvents(Member.AGGREGATE_NAME, id),
        );
        return memberAggregate;
    }

}