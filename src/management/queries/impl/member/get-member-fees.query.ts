import { IQuery } from "@nestjs/cqrs";

export class GetMemberFees implements IQuery{
    constructor(public readonly idOrCard: string){}
}