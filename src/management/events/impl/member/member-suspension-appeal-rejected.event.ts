import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('member-suspension-appeal-rejected')
export class MemberSuspensionApealRejected implements IEvent {
  constructor(
    public readonly id: string,
    public readonly appealRejectedDate: Date,
    public readonly justification: string,
  ) { }
}
