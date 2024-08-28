import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('member-suspended')
export class MemberSuspended implements IEvent {

  constructor(
    public readonly id: string,
    public readonly suspendedDate: Date,
    public readonly suspendedUntil: Date,
    public readonly reason: string,
    public readonly appealDeadline: Date,
  ) { }
}
