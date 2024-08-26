import { StorableEvent } from "event-sourcing-nestjs";
import { Member } from "../../../domain/member/member.aggregate";

export class MemberExpelled extends StorableEvent {
  eventAggregate = Member.AGGREGATE_NAME;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly expelledDate: Date,
    public readonly reason: string,
    public readonly appealDeadline: Date,
  ) {
    super();
  }
}
