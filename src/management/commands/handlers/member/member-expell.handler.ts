import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberExpell } from "../../impl/member/member-expell.command";

@CommandHandler(MemberExpell)
export class MemberExpellHandler implements ICommandHandler<MemberExpell> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
    ) { }

    async execute(command: MemberExpell) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.expellMember(command.expellDate, command.expulsionReason, command.appealDeadline);
            member.commit();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}