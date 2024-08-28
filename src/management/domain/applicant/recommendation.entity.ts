export class Recommendation {
  private _cardNumber: string;
  private _isValid?: boolean;
  private _isRecommended?: boolean;

  constructor(cardNumber: string, isValid?: boolean, isRecommended?: boolean) {
    this._cardNumber = cardNumber;
    this._isValid = isValid;
    this._isRecommended = isRecommended;
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
