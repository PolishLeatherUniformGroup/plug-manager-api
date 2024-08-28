import { IEvent , Event} from "@ocoda/event-sourcing";

@Event('applicant-application-not-recommended')
export class ApplicantNotRecommended implements IEvent{
  constructor(public readonly id: string) {}
}
