import { IQuery } from "@nestjs/cqrs";
import { MemberStatus } from "../../../domain/member/member-status.enum";

export class GetMembers implements IQuery {
    constructor(public readonly status?: MemberStatus) { }
}