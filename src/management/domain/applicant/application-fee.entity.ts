export class ApplicationFee {

    private _id: string;
    private _amount: number;
    private _isPaid?: boolean;
    private _paymentDate?: Date;

    constructor(id: string, amount: number) {
        this._id = id;
        this._amount = amount;
    }

    public get id(): string {
        return this._id;
    }

    public get amount(): number {
        return this._amount;
    }

    public get isPaid(): boolean | undefined {
        return this._isPaid;
    }

    public get paymentDate(): Date | undefined {
        return this._paymentDate;
    }

    public markPaid(paymentDate: Date): void {
        this._isPaid = true;
        this._paymentDate = paymentDate;
    }
}