import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('member-suspension-appeal-accepted')
export class MemberSuspensionApealAccepted implements IEvent {
  constructor(
    public readonly id: string,
    public readonly appealAcceptedDate: Date,
  ) {}
}
