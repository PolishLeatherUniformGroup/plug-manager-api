import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('applicant-recommendations-validated-positive')
export class ApplicantRecommendationsValidatedPositive implements IEvent {
  constructor(
    public readonly id: string,
    public readonly status: ApplicantStatus,
  ) {}
}
