import { IEvent, Event } from '@ocoda/event-sourcing';

@Event('member-membership-fee-payment-requested')
export class MemberMembershipFeePaymentRequested implements IEvent {
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly amount: number,
    public readonly dueDate: Date,
  ) {}
}
