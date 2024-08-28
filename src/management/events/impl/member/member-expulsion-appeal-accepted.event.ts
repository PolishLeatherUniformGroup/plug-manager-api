import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('member-expulsion-appeal-accepted')
export class MemberExpulsionApealAccepted implements IEvent {
  constructor(
    public readonly id: string,
    public readonly appealAcceptedDate: Date,
  ) {}
}
