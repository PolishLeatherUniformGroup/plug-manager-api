import { AggregateRoot, UUID } from "@ocoda/event-sourcing";

export interface IAggregateRepository<T extends AggregateRoot> {
  getById(id: UUID): Promise<T>;
  save(aggregate:T): Promise<void>;
}
