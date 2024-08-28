import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberSuspensionAppeal } from "../../impl/member/member-suspension-appeal.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberSuspensionAppeal)
export class MemberSuspensionAppealHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberSuspensionAppeal) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.appealSuspension(command.justification, command.appealDate);
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
