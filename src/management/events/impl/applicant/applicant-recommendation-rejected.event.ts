import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('applicant-recommendation-rejected')
export class ApplicantRecommendationRejected implements IEvent{
constructor(
    public readonly id: string,
    public readonly recommendationId: string,
  ) {}
}
