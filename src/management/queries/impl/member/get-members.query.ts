import { IQuery } from "@ocoda/event-sourcing";
import { MemberStatus } from "../../../domain/member/member-status.enum";

export class GetMembers implements IQuery {
    constructor(public readonly status?: MemberStatus) { }
}