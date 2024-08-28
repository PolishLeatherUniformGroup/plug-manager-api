import { IEvent,Event} from "@ocoda/event-sourcing";

@Event('member-expulsion-appealed')
export class MemberExpulsionApealed implements IEvent {
  constructor(
    public readonly id: string,
    public readonly justification: string,
    public readonly appeal: Date,
  ) {}
}
