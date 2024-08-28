import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberAcceptExpulsionAppeal } from "../../impl/member/member-accept-expulsion-appeal.command";

@CommandHandler(MemberAcceptExpulsionAppeal)
export class MemberAcceptExpulsionAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberAcceptExpulsionAppeal) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.acceptExpulsionAppeal(command.acceptDate);
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
