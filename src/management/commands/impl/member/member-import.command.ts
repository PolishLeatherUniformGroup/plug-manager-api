import { ICommand } from "@ocoda/event-sourcing";
import { ImportedMember } from "../../../domain/member-import";

export class MemberImport implements ICommand {
    constructor(public readonly members: ImportedMember[]) { }
}