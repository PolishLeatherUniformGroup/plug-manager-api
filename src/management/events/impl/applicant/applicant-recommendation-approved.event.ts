import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('applicant-recommendation-approved')
export class ApplicantRecommendationApproved implements IEvent {
 constructor(
    public readonly id: string,
    public readonly recommendationId: string,
  ) {}
}
