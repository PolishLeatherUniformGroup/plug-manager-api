import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MemberReinstate } from "../../impl/member/member-reinstate.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";

@CommandHandler(MemberReinstate)
export class MemberReinstateHandler
  implements ICommandHandler<MemberReinstate>
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly eventPublisher: StoreEventPublisher,
  ) {}

  async execute(command: MemberReinstate) {
    try {
      var member = this.eventPublisher.mergeObjectContext(
        await this.memberRepository.getById(command.id),
      );
      member.reinstateMember(new Date());
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
