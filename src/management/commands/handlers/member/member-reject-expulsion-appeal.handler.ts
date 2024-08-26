import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberRejectExpulsionAppeal } from "../../impl/member/member-reject-expulsion-appeal.command";

@CommandHandler(MemberRejectExpulsionAppeal)
export class MemberRejectExpulsionAppealHandler implements ICommandHandler<MemberRejectExpulsionAppeal> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
    ) { }

    async execute(command: MemberRejectExpulsionAppeal) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.rejectExpulsionAppeal(command.rejectDate, command.justification);
            member.commit();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}