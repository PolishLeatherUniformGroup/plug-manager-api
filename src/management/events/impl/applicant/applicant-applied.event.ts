import { StorableEvent } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";
import { Address } from "../../../domain/address.value-object";
import { Recommendation } from "../../../domain/applicant/recommendation.entity";

export class ApplicantApplied extends StorableEvent {
  eventAggregate = Applicant.AGGREGATE_NAME;
  eventVersion = 1;

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
    super();
  }
}
