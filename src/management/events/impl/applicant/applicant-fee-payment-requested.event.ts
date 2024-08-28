import { IEvent ,Event} from "@ocoda/event-sourcing";
@Event('applicant-fee-payment-requested')
export class ApplicantFeePaymentRequested implements IEvent {
constructor(
    public readonly id: string,
    public readonly amount: number,
  ) {}
}
