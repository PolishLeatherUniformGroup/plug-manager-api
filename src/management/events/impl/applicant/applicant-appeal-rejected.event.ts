import { IEvent,Event } from "@ocoda/event-sourcing";

@Event('applicant-appeal-rejected')
export class ApplicantAppealRejected implements IEvent {
constructor(
    public readonly id: string,
    public readonly rejectedDate: Date,
    public readonly justification: string,
  ) {}
}
