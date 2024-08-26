import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberSuspendMembership } from "../../impl/member/member-suspend-membership.command";

@CommandHandler(MemberSuspendMembership)
export class MemberSuspendMembershipHandler
  implements ICommandHandler<MemberSuspendMembership>
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly eventPublisher: StoreEventPublisher,
  ) {}

  async execute(command: MemberSuspendMembership) {
    try {
      var member = this.eventPublisher.mergeObjectContext(
        await this.memberRepository.getById(command.id),
      );
      member.suspendMember(
        command.suspendDate,
        command.suspendUntilDate,
        command.suspendReason,
        command.appealDeadline,
      );
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
