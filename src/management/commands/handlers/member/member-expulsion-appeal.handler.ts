import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberExpulsionAppeal } from "../../impl/member/member-expulsion-appeal.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberExpulsionAppeal)
export class MemberExpulsionAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberExpulsionAppeal) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.appealExpulsion(command.justification, command.appealDate);
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
