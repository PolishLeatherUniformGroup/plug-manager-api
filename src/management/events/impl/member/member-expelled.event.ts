import { IEvent ,Event } from "@ocoda/event-sourcing";

@Event('member-expelled')
export class MemberExpelled implements IEvent {

  constructor(
    public readonly id: string,
    public readonly expelledDate: Date,
    public readonly reason: string,
    public readonly appealDeadline: Date,
  ) {}
}
