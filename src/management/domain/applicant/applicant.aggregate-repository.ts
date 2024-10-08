import { EventStore, EventStream } from "@ocoda/event-sourcing";
import { IAggregateRepository } from "../../shared/domain/aggregate-repository";
import { Applicant } from "./applicant.aggregate";
import { ApplicantId } from "./applicant-id";
import { ApplicantNotFoundException } from "./applicant-not-found-exception";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ApplicantAggregateRepository implements IAggregateRepository<Applicant> {
  private readonly logger = new Logger(ApplicantAggregateRepository.name);
  constructor(private readonly eventStore: EventStore) {}
  async save(aggregate: Applicant): Promise<void> {
    const events = aggregate.commit();
    const stream = EventStream.for<Applicant>(Applicant, aggregate.id);

    await Promise.all([
      this.eventStore.appendEvents(stream, aggregate.version, events),
    ]);
  }

  async getById(id: ApplicantId): Promise<Applicant> {
    const eventStream = EventStream.for<Applicant>(Applicant, id);
    this.logger.log(`Getting applicant by id ${id.value}`);
    const member = new Applicant(id);

    const events = this.eventStore.getEvents(eventStream, { fromVersion: member.version + 1 });
    await member.loadFromHistory(events);

    if (member.version < 1) {
        throw new ApplicantNotFoundException(id.value);
    }

    return member;
  }
}
