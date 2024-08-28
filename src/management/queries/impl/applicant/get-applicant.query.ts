import { IQuery } from "@ocoda/event-sourcing";

export class GetApplicant implements IQuery {
  constructor(public id: string) { }
}