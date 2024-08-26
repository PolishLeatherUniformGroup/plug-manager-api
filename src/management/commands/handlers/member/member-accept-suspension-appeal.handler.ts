import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberAcceptSuspensionAppeal } from "../../impl/member/member-accept-suspension-appeal.command";

@CommandHandler(MemberAcceptSuspensionAppeal)
export class MemberAcceptSuspensionAppealHandler
  implements ICommandHandler<MemberAcceptSuspensionAppeal>
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly eventPublisher: StoreEventPublisher,
  ) {}

  async execute(command: MemberAcceptSuspensionAppeal) {
    try {
      var member = this.eventPublisher.mergeObjectContext(
        await this.memberRepository.getById(command.id),
      );
      member.acceptSuspensionAppeal(command.acceptDate);
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
