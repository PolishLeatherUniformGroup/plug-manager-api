import { Address } from "../../../dto/address.dto";
import { IEvent, Event, EventSerializer, IEventSerializer, IEventPayload } from "@ocoda/event-sourcing";

@Event('applicant-applied')
export class ApplicantApplied implements IEvent {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly address: Address,
    public readonly birthDate: Date,
    public readonly applyDate: Date,
    public readonly recommendations: string[],
    public readonly phoneNumber?: string,
  ) {
  }
}

@EventSerializer(ApplicantApplied)
export class AccountOpenedEventSerializer implements IEventSerializer {
  serialize({ id, firstName, lastName, email, phoneNumber, address, birthDate, applyDate, recommendations }: ApplicantApplied): IEventPayload<ApplicantApplied> {
    return {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address: {
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
        house: address.house,
        region: address.region,
        apartment: address.apartment,
      },
      birthDate : birthDate.toISOString(),
      applyDate : applyDate.toISOString(),
      recommendations: recommendations.map((r) => r.toString()),
     };
  }

  deserialize({ id, firstName, lastName, email, phoneNumber, address, birthDate , applyDate, recommendations}: IEventPayload<ApplicantApplied>): ApplicantApplied {
    const addressObj = JSON.parse(address);
    return new ApplicantApplied(id, firstName, lastName, email, addressObj, new Date(birthDate), new Date(applyDate), recommendations, phoneNumber);
  }
}
