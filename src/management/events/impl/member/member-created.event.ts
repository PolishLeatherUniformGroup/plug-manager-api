import { IEvent ,Event} from "@ocoda/event-sourcing";
import { Address } from "../../../domain/address.value-object";

@Event('member-created')
export class MemberCreated implements IEvent {
  constructor(
    public readonly id: string,
    public readonly cardNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly address: Address,
    public readonly applyDate: Date,
    public readonly birthDate: Date,
    public readonly joinDate: Date,
    public readonly paid: number,
    public readonly phoneNumber?: string,
  ) {}
}
