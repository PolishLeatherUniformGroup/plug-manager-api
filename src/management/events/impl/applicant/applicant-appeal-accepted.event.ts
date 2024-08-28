import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('applicant-appeal-accepted')
export class ApplicantAppealAccepted implements IEvent {
   constructor(
    public readonly id: string,
    public readonly acceptedDate: Date,
  ) {}
}
