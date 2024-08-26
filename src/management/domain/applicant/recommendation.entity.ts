export class Recommendation {
  private _id: string;
  private _cardNumber: string;
  private _isValid?: boolean;
  private _isRecommended?: boolean;

  constructor(id: string, cardNumber: string) {
    this._id = id;
    this._cardNumber = cardNumber;
  }

  public get id(): string {
    return this._id;
  }

  public get cardNumber(): string {
    return this._cardNumber;
  }

  public get isValid(): boolean | undefined {
    return this._isValid;
  }

  public get isRecommended(): boolean | undefined {
    return this._isRecommended;
  }

  public markValid(): void {
    this._isValid = true;
  }

  public markInvalid(): void {
    this._isValid = false;
  }

  public markRecommended(): void {
    this._isRecommended = true;
  }

  public markNotRecommended(): void {
    this._isRecommended = false;
  }
}
