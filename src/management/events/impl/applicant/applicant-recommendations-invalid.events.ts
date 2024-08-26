import { StorableEvent } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";

export class ApplicantRecommendationsNotValid extends StorableEvent {
  eventAggregate = Applicant.AGGREGATE_NAME;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly status: ApplicantStatus,
  ) {
    super();
  }
}
