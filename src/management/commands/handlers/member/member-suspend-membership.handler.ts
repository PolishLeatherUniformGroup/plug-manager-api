import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberSuspendMembership } from "../../impl/member/member-suspend-membership.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberSuspendMembership)
export class MemberSuspendMembershipHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberSuspendMembership) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.suspendMember(
        command.suspendDate,
        command.suspendUntilDate,
        command.suspendReason,
        command.appealDeadline,
      );
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
