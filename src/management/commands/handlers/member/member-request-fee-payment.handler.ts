import { CommandHandler, ICommandHandler } from '@ocoda/event-sourcing';
import { MemberRequestFeePayment } from '../../impl/member/member-request-fee-payment.command';
import { MemberAggregateRepository } from '../../../domain/member/member.aggregate-repository';
import { MemberId } from '../../../domain/member/member-id';

@CommandHandler(MemberRequestFeePayment)
export class MemberRequestFeePaymentHandler implements ICommandHandler<MemberRequestFeePayment> {
    constructor(private readonly memberRepository: MemberAggregateRepository) {
    }
    async execute(command) {
        try {
            const member = await this.memberRepository.getById(MemberId.from(command.id));
         
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}