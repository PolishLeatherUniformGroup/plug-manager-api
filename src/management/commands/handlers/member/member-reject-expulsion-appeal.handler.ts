import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberRejectExpulsionAppeal } from "../../impl/member/member-reject-expulsion-appeal.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberRejectExpulsionAppeal)
export class MemberRejectExpulsionAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberRejectExpulsionAppeal) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.rejectExpulsionAppeal(command.rejectDate, command.justification);
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
