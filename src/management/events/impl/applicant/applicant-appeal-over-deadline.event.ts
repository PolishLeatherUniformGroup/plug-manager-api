import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('applicant-appeal-over-deadline')
export class ApplicantAppealOverDeadline implements IEvent{
constructor(public readonly id: string) { }
}
