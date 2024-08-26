import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberRequestFeePayment } from "../../impl/member/member-request-fee-payment.command";

@CommandHandler(MemberRequestFeePayment)
export class MemberRequestFeePaymentHandler implements ICommandHandler<MemberRequestFeePayment> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
    ) { }

    async execute(command: MemberRequestFeePayment) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.requestMembershipFeePayment(command.year, command.dueAmount, command.dueDate);
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}