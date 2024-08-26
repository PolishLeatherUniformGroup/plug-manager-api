import { AggregateRoot } from "@nestjs/cqrs";

export interface IAggregateRepository<T extends AggregateRoot> {
  getById(id: string): Promise<T>;
}
