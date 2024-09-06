import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('member-activated')
export class MemberActivated implements IEvent {
    public constructor(public readonly id: string) {
    }
}