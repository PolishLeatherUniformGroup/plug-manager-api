import { IEvent ,Event} from "@ocoda/event-sourcing";

@Event('applicant-fee-paid')
export class ApplicantFeePaid implements IEvent {
constructor(
    public readonly id: string,
    public readonly paidDate: Date,
  ) {}
}
