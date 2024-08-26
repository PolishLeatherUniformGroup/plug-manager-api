import { StorableEvent } from "event-sourcing-nestjs";
import { Member } from "../../../domain/member/member.aggregate";

export class MemberSuspended extends StorableEvent {
  eventAggregate = Member.AGGREGATE_NAME;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly suspendedDate: Date,
    public readonly suspendedUntil: Date,
    public readonly reason: string,
    public readonly appealDeadline: Date,
  ) {
    super();
  }
}
