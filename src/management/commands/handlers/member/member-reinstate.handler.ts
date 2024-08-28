import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { MemberReinstate } from "../../impl/member/member-reinstate.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberId } from "../../../domain/member/member-id";


@CommandHandler(MemberReinstate)
export class MemberReinstateHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberReinstate) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.reinstateMember(new Date());
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
