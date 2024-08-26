import { StorableEvent } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";

export class ApplicantRecommendationRejected extends StorableEvent {
  eventAggregate = Applicant.AGGREGATE_NAME;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly recommendationId: string,
  ) {
    super();
  }
}
