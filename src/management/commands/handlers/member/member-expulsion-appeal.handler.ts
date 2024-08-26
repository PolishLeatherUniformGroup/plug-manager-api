import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberExpulsionAppeal } from "../../impl/member/member-expulsion-appeal.command";

@CommandHandler(MemberExpulsionAppeal)
export class MemberExpulsionAppealHandler
  implements ICommandHandler<MemberExpulsionAppeal>
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly eventPublisher: StoreEventPublisher,
  ) {}

  async execute(command: MemberExpulsionAppeal) {
    try {
      var member = this.eventPublisher.mergeObjectContext(
        await this.memberRepository.getById(command.id),
      );
      member.appealExpulsion(command.justification, command.appealDate);
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
