import { IEvent,Event} from "@ocoda/event-sourcing";

@Event('applicant-appealed-rejection')
export class ApplicantAppealedRejection implements IEvent {
constructor(
    public readonly id: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
