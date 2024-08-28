import { EventStore, EventStream } from "@ocoda/event-sourcing";
import { IAggregateRepository } from "../../shared/domain/aggregate-repository";
import { Member } from "./member.aggregate";
import { MemberNotFoundException } from "./member-not-found-exception";
import { MemberId } from "./member-id";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MemberAggregateRepository implements IAggregateRepository<Member> {

  constructor(private readonly eventStore: EventStore) {}
  async save(aggregate: Member): Promise<void> {
    const events = aggregate.commit();
    const stream = EventStream.for<Member>(Member, aggregate.id);

    await Promise.all([
      this.eventStore.appendEvents(stream, aggregate.version, events),
    ]);
  }

  async getById(id: MemberId): Promise<Member> {
    const eventStream = EventStream.for<Member>(Member, id);
    const member = new Member(id);

    const events = this.eventStore.getEvents(eventStream, { fromVersion: member.version + 1 });

    await member.loadFromHistory(events);

    if (member.version < 1) {
        throw new MemberNotFoundException(id.value);
    }

    return member;
  }
}
