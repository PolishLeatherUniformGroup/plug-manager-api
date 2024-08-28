import { IEvent,Event } from "@ocoda/event-sourcing";

@Event('member-membership-terminated')
export class MemberMembershipTerminated implements IEvent {
  constructor(
    public readonly id: string,
    public readonly terminationDate: Date,
  ) {}
}
