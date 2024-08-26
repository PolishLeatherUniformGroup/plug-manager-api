import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberRequestFeePayment } from "../../impl/member/member-request-fee-payment.command";
import { MemberRegisterFeePayment } from "../../impl/member/member-register-fee-payment.command";

@CommandHandler(MemberRequestFeePayment)
export class MemberRegisterFeePaymentHandler
  implements ICommandHandler<MemberRegisterFeePayment>
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly eventPublisher: StoreEventPublisher,
  ) {}

  async execute(command: MemberRegisterFeePayment) {
    try {
      var member = this.eventPublisher.mergeObjectContext(
        await this.memberRepository.getById(command.id),
      );
      member.registerMembershipFeePayment(
        command.year,
        command.paymentAmount,
        command.paymentDate,
      );
      member.commit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
