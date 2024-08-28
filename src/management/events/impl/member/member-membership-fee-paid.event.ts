import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('member-membership-fee-paid')
export class MemberMembershipFeePaid implements IEvent {
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly amount: number,
    public readonly date: Date,
  ) {}
}
