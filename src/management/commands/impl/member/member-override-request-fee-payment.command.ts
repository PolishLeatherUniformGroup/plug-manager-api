import { ICommand } from "@ocoda/event-sourcing";

export class MemberOverrideRequestFeePayment implements ICommand {
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly dueAmount: number,
    public readonly dueDate: Date,
  ) {}
}
