import { IQuery } from "@ocoda/event-sourcing";

export class GetMemberFees implements IQuery{
    constructor(public readonly idOrCard: string){}
}