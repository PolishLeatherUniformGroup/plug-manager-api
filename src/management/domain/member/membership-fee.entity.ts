export class MembershipFee {

  constructor(public year: number, public dueAmount: number, public dueDate: Date, public paidAmount?: number, public paidDate?: Date) {
  }

  public registerPayment(amount: number, date: Date) {
    this.paidAmount = amount;
    this.paidDate = date;
  }

  public isBalanced(): boolean {
    return this.paidAmount === this.dueAmount;
  }

}
