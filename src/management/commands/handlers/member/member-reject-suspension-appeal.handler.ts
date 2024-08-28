import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberAcceptSuspensionAppeal } from "../../impl/member/member-accept-suspension-appeal.command";
import { MemberRejectSuspensionAppeal } from "../../impl/member/member-reject-suspension-appeal.commanf";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberRejectSuspensionAppeal)
export class MemberRejectSuspensionAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberRejectSuspensionAppeal) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.rejectSuspensionAppeal(command.rejectDate, command.justification);
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
