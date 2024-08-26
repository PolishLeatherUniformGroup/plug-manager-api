import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberAcceptSuspensionAppeal } from "../../impl/member/member-accept-suspension-appeal.command";
import { MemberRejectSuspensionAppeal } from "../../impl/member/member-reject-suspension-appeal.commanf";

@CommandHandler(MemberRejectSuspensionAppeal)
export class MemberRejectSuspensionAppealHandler implements ICommandHandler<MemberRejectSuspensionAppeal> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
    ) { }

    async execute(command: MemberRejectSuspensionAppeal) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.rejectSuspensionAppeal(command.rejectDate, command.justification);
            member.commit();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}