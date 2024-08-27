import { IQuery } from "@nestjs/cqrs";

export class GetApplicant implements IQuery {
  constructor(public id: string) { }
}