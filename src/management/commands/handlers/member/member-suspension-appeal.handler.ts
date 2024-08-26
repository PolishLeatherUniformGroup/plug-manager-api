import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberSuspensionAppeal } from "../../impl/member/member-suspension-appeal.command";

@CommandHandler(MemberSuspensionAppeal)
export class MemberSuspensionAppealHandler implements ICommandHandler<MemberSuspensionAppeal> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
    ) { }

    async execute(command: MemberSuspensionAppeal) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.appealSuspension(command.justification, command.appealDate);
            member.commit();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}