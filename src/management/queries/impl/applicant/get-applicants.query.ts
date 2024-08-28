import { IQuery } from "@ocoda/event-sourcing";

export class GetApplicants implements IQuery {
  constructor(public readonly status?: number) {}
}