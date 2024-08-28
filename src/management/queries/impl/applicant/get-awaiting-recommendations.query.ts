import { IQuery } from "@ocoda/event-sourcing";

export class GetAwaitingRecommendations implements IQuery {
    constructor(public readonly cardOrId: string) { }
}