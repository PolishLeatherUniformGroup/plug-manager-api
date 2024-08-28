import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantRegisterFeePayment implements ICommand {
  constructor(
    public readonly id: string,
    public readonly paidDate: Date,
  ) {}
}
