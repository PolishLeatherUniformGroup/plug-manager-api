import { IEvent ,Event } from "@ocoda/event-sourcing";
import { Address } from "../../../domain/address.value-object";

@Event('member-contact-data-updated')
export class MemberContactDataUpdated implements IEvent {

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly address: Address,
  ) { }
}
