import { IQuery } from "@nestjs/cqrs";

export class GetApplicants implements IQuery {
  constructor(public readonly status?: number) {}
}