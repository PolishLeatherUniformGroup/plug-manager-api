export class MembershipFee {
  private _year: number;
  private _dueAmount: number;
  private _paidAmount?: number;
  private _dueDate: Date;
  private _paidDate?: Date;

  get year(): number {
    return this._year;
  }

  get dueAmount(): number {
    return this._dueAmount;
  }

  get paidAmount(): number | undefined {
    return this._paidAmount;
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  get paidDate(): Date | undefined {
    return this._paidDate;
  }

  public registerPayment(amount: number, date: Date) {
    this._paidAmount = amount;
    this._paidDate = date;
  }

  public isBalanced(): boolean {
    return this._paidAmount === this._dueAmount;
  }

  constructor(year: number, dueAmount: number, dueDate: Date) {
    this._year = year;
    this._dueAmount = dueAmount;
    this._dueDate = dueDate;
  }
}
