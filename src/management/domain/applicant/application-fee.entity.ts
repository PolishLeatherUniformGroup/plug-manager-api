export class ApplicationFee {


  constructor( public amount: number, public  paymentDate?: Date, public  isPaid: boolean = false) {

  }

  public markPaid(paymentDate: Date): void {
    this.isPaid = true;
    this.paymentDate = paymentDate;
  }
}
