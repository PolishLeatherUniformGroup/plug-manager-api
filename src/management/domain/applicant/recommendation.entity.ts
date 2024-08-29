export class Recommendation {
  constructor(public cardNumber: string, public isValid?: boolean, public isRecommended?: boolean) {
  }


  public markValid(): void {
    this.isValid = true;
  }

  public markInvalid(): void {
    this.isValid = false;
  }

  public markRecommended(): void {
    this.isRecommended = true;
  }

  public markNotRecommended(): void {
    this.isRecommended = false;
  }

}
