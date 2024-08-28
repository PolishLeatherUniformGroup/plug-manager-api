import { IQuery } from "@ocoda/event-sourcing";

export class GetMemberSuspensions implements IQuery{
    constructor(public readonly idOrCard: string){}
}