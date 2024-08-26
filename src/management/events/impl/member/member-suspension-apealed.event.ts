import { StorableEvent } from "event-sourcing-nestjs";
import { Member } from "../../../domain/member/member.aggregate";
export class MemberSuspensionApealed extends StorableEvent {
  eventAggregate = Member.AGGREGATE_NAME;
  eventVersion = 1;
  constructor(
    public readonly id: string,
    public readonly justification: string,
    public readonly appeal: Date,
  ) {
    super();
  }
}
