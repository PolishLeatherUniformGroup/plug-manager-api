import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { IEvent,Event } from '@ocoda/event-sourcing';

@Event('applicant-recommendations-validated-negative')
export class ApplicantRecommendationsValidatedNegative implements IEvent {
  constructor(
    public readonly id: string,
    public readonly status: ApplicantStatus,
  ) {}
}
