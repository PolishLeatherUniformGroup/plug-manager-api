import { IQuery} from "@ocoda/event-sourcing";

export class GetMember implements IQuery{
  constructor(public readonly idOrCard: string) { }
}