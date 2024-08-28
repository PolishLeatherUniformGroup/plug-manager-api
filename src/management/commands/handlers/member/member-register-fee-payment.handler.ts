import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberRequestFeePayment } from "../../impl/member/member-request-fee-payment.command";
import { MemberRegisterFeePayment } from "../../impl/member/member-register-fee-payment.command";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberRequestFeePayment)
export class MemberRegisterFeePaymentHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) {}

  async execute(command: MemberRegisterFeePayment) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.registerMembershipFeePayment(
        command.year,
        command.paymentAmount,
        command.paymentDate,
      );
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
