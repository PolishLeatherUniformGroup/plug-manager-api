import { IEvent,Event } from "@ocoda/event-sourcing";

@Event('member-suspension-apealed')
export class MemberSuspensionApealed implements IEvent {
  constructor(
    public readonly id: string,
    public readonly justification: string,
    public readonly appeal: Date,
  ) {}
}
