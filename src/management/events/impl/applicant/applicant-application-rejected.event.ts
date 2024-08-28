import { IEvent ,Event } from "@ocoda/event-sourcing";

@Event('applicant-application-rejected')
export class ApplicantApplicationRejected implements IEvent {
constructor(
    public readonly id: string,
    public readonly rejectDate: Date,
    public readonly justification: string,
    public readonly appealDeadline: Date,
  ) {}
}
