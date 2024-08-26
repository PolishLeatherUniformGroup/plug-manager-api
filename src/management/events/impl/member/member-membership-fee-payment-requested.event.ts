import { StorableEvent } from "event-sourcing-nestjs";
import { Member } from "../../../domain/member/member.aggregate";

export class MemberMembershipFeePaymentRequested extends StorableEvent {
  eventAggregate = Member.AGGREGATE_NAME;
  eventVersion = 1;
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly amount: number,
    public readonly dueDate: Date,
  ) {
    super();
  }
}
