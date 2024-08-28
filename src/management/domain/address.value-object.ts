import { ValueObject } from "@ocoda/event-sourcing";

interface AddressProps {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  house: string;
  region?: string;
  appartment?: string;
}
export class Address extends ValueObject<AddressProps> {
  get country(): string {
    return this.props.country;
  }
  get city(): string {
    return this.props.city;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get street(): string {
    return this.props.street;
  }

  get house(): string {
    return this.props.house;
  }

  get region(): string | undefined {
    return this.props.region;
  }
  get apartment(): string | undefined {
    return this.props.appartment;
  }

  private constructor(props: AddressProps) {
    super(props);
  }

  public static create(
    country: string,
    city: string,
    postalCode: string,
    street: string,
    house: string,
    region?: string,
    appartment?: string,
  ): Address {
    return new Address({
      country,
      city,
      postalCode,
      street,
      house,
      region,
      appartment,
    });
  }
}
