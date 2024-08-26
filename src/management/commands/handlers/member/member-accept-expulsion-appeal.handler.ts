import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberAcceptExpulsionAppeal } from "../../impl/member/member-accept-expulsion-appeal.command";

@CommandHandler(MemberAcceptExpulsionAppeal)
export class MemberAcceptExpulsionAppealHandler
  implements ICommandHandler<MemberAcceptExpulsionAppeal>
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly eventPublisher: StoreEventPublisher,
  ) {}

  async execute(command: MemberAcceptExpulsionAppeal) {
    try {
      var member = this.eventPublisher.mergeObjectContext(
        await this.memberRepository.getById(command.id),
      );
      member.acceptExpulsionAppeal(command.acceptDate);
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
