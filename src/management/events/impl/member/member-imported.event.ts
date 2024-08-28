import { IEvent, Event, EventSerializer, IEventPayload, IEventSerializer } from "@ocoda/event-sourcing";
import { ApplicantApplied } from "../applicant/applicant-applied.event";

@Event('member-imported')
export class MemberImported implements IEvent {
    constructor(
        public readonly id: string,
        public readonly cardNumber: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly joinDate: Date,
        public readonly paid: number,
        public readonly birthDate?: Date,
        public readonly phoneNumber?: string,
    ) { }
}
@EventSerializer(MemberImported)
export class MemberImportedSerializer implements IEventSerializer {
    serialize({ id, firstName, lastName, email, phoneNumber, cardNumber, birthDate, joinDate, paid }: MemberImported): IEventPayload<MemberImported> {
        return {
            id,
            cardNumber,
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDate: birthDate?.toISOString(),
            joinDate: joinDate.toISOString(),
            paid,
        };
    }

    deserialize({ id, firstName, lastName, email, phoneNumber, cardNumber, birthDate, joinDate, paid }: IEventPayload<MemberImported>): MemberImported {
        return new MemberImported(id, cardNumber, firstName, lastName, email, new Date(joinDate), paid, birthDate ? new Date(birthDate) : undefined, phoneNumber);
    }
}