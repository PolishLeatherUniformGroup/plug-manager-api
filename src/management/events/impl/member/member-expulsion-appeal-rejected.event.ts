import { IEvent,Event } from "@ocoda/event-sourcing";

@Event('member-expulsion-appeal-rejected')
export class MemberExpulsionApealRejected implements IEvent {
  constructor(
    public readonly id: string,
    public readonly justification: string,
    public readonly appealRejectedDate: Date,
  ) {}
}
