import { Address } from "../../../domain/address.value-object";
import { Recommendation } from "../../../domain/applicant/recommendation.entity";
import { IEvent , Event} from "@ocoda/event-sourcing";

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
    public readonly recommendations: Recommendation[],
    public readonly phoneNumber?: string,
  ) {
  }
}
