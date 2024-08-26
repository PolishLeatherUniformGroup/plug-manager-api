import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberTerminateMembership } from "../../impl/member/member-terminate-membership.command";

@CommandHandler(MemberTerminateMembership)
export class MemberTerminateMembershipHandler implements ICommandHandler<MemberTerminateMembership> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
    ) { }

    async execute(command: MemberTerminateMembership) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.terminateMembership();
            member.commit();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}