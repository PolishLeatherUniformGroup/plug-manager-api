import { ICommand } from "@nestjs/cqrs";
import { Address } from "../../../domain/address.value-object";

export class MemberCreate implements ICommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly birthDate: Date,
        public readonly applyDate: Date,
        public readonly address: Address,
        public readonly joinDate: Date,
        public readonly phone?: string,
    ) { }
}