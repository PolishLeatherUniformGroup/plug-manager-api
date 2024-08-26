import { StorableEvent } from "event-sourcing-nestjs";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";

export class ApplicantRecommendationsValid extends StorableEvent {
  eventAggregate = Applicant.AGGREGATE_NAME;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly status: ApplicantStatus,
  ) {
    super();
  }
}
