import { IEvent, Event, EventSerializer, IEventPayload, IEventSerializer } from "@ocoda/event-sourcing";
import { ApplicantApplied } from "../applicant/applicant-applied.event";
import { Address } from "../../../dto/address.dto";

@Event('member-imported')
export class MemberImported implements IEvent {
    constructor(
        public readonly id: string,
        public readonly cardNumber: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly joinDate: Date,
        public readonly birthDate?: Date,
        public readonly phoneNumber?: string,
        public readonly address?: Address,
    ) { }
}
@EventSerializer(MemberImported)
export class MemberImportedSerializer implements IEventSerializer {
    serialize({ id, firstName, lastName, email, phoneNumber, cardNumber, birthDate, joinDate, address }: MemberImported): IEventPayload<MemberImported> {
        return {
            id,
            cardNumber,
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDate: birthDate?.toISOString(),
            joinDate: joinDate.toISOString(),
            address: JSON.stringify(address),
        };
    }

    deserialize({ id, firstName, lastName, email, phoneNumber, cardNumber, birthDate, joinDate, address }: IEventPayload<MemberImported>): MemberImported {
        return new MemberImported(id, cardNumber, firstName, lastName, email, new Date(joinDate), birthDate ? new Date(birthDate) : undefined, phoneNumber, JSON.parse(address));
    }
}