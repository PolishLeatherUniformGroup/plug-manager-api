import { IQuery } from "@ocoda/event-sourcing";

export class GetMemberExpulsions implements IQuery{
    constructor(public readonly idOrCard: string){}
}