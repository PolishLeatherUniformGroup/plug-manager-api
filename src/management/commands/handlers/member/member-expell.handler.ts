import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberExpell } from "../../impl/member/member-expell.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberExpell)
export class MemberExpellHandler implements ICommandHandler {
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberExpell) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.expellMember(
        command.expellDate,
        command.expulsionReason,
        command.appealDeadline,
      );
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
