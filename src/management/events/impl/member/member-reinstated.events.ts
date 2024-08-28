import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('member-reinstated')
export class MemberResinstated implements IEvent {

  constructor(
    public readonly id: string,
    public readonly reinstatedDate: Date,
  ) {}
}
