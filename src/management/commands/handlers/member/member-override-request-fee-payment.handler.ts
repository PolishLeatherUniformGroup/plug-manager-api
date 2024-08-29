import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";

import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberId } from "../../../domain/member/member-id";
import { MemberOverrideRequestFeePayment } from "../../impl/member/member-override-request-fee-payment.command";

@CommandHandler(MemberOverrideRequestFeePayment)
export class MemberOverrideRequestFeePaymentHandler
  implements ICommandHandler {
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
  ) { }

  async execute(command: MemberOverrideRequestFeePayment) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.requestMembershipFeePayment(
        command.year,
        command.dueAmount,
        command.dueDate,
      );
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
