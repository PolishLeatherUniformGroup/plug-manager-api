import { ICommand } from "@nestjs/cqrs";
import { AddressDto } from "../../../dto/address.dto";

export class ApplicantApply implements ICommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly address: AddressDto,
        public readonly birthDate: Date,
        public readonly applyDate: Date,
        public readonly recommenderCards: string[],
        public readonly phoneNumber?: string
    ) { }
}