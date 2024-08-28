import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberAcceptSuspensionAppeal } from "../../impl/member/member-accept-suspension-appeal.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberAcceptSuspensionAppeal)
export class MemberAcceptSuspensionAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberAcceptSuspensionAppeal) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.acceptSuspensionAppeal(command.acceptDate);
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
