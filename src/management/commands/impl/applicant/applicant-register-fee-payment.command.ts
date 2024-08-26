import { ICommand } from "@nestjs/cqrs";

export class ApplicantRegisterFeePayment implements ICommand {
  constructor(
    public readonly id: string,
    public readonly paidDate: Date,
  ) {}
}
