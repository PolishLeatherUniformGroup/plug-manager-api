import { IQuery } from "@nestjs/cqrs";

export class GetMember implements IQuery{
  constructor(public readonly idOrCard: string) { }
}