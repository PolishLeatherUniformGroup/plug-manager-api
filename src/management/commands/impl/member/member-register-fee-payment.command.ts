import { ICommand } from "@nestjs/cqrs";
export class MemberRegisterFeePayment implements ICommand {
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly paymentDate: Date,
    public readonly paymentAmount: number,
  ) {}
}
