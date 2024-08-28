import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { MemberImport } from "../../impl/member/member-import.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { Member } from "../../../domain/member/member.aggregate";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberImport)
export class MemberImportHandler implements ICommandHandler<MemberImport> {
    constructor(
        private readonly repository: MemberAggregateRepository) { }

    async execute(command: MemberImport): Promise<void> {
        for (const member of command.members) {
            const imported = Member.import(MemberId.generate(),
                member.cardNumber, member.firstName, member.lastName, member.email, member.joinDate, 120, member.birthDate, member.phone);
            await this.repository.save(imported);
        }
    }

}