import { IEvent, Event } from "@ocoda/event-sourcing";

@Event('applicant-application-accepted')
export class ApplicantApplicationAccepted implements IEvent {
 constructor(
    public readonly id: string,
    public readonly acceptedDate: Date,
  ) {}
}
