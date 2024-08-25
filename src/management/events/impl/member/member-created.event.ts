import { StorableEvent } from "event-sourcing-nestjs";
import { Member } from "../../../domain/member/member.aggregate";
import { Address } from "../../../domain/address.value-object";

export class MemberCreated extends StorableEvent {
    eventAggregate = Member.AGGREGATE_NAME;
    eventVersion = 1;
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
        public readonly phoneNumber?: string,) {
        super();
    }
}