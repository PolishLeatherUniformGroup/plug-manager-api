import { IQuery } from "@nestjs/cqrs";

export class GetAwaitingRecommendations implements IQuery {
    constructor(public readonly cardOrId: string) { }
}