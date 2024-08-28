import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberTerminateMembership } from "../../impl/member/member-terminate-membership.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberTerminateMembership)
export class MemberTerminateMembershipHandler
  implements ICommandHandler {
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) { }

  async execute(command: MemberTerminateMembership) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.terminateMembership(command.terminateDate);
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
