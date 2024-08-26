import { StorableEvent } from "event-sourcing-nestjs";
import { Member } from "../../../domain/member/member.aggregate";
import { Address } from "../../../domain/address.value-object";

export class MemberContactDataUpdated extends StorableEvent {
  eventAggregate = Member.AGGREGATE_NAME;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly address: Address,
  ) {
    super();
  }
}
