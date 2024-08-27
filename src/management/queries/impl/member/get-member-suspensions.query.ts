import { IQuery } from "@nestjs/cqrs";

export class GetMemberSuspensions implements IQuery{
    constructor(public readonly idOrCard: string){}
}