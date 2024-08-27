import { IQuery } from "@nestjs/cqrs";

export class GetMemberExpulsions implements IQuery{
    constructor(public readonly idOrCard: string){}
}