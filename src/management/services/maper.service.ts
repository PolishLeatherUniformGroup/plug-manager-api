import { Injectable } from "@nestjs/common";
import { Address as AddressDto } from "../dto/address.dto";
import { Address } from "../domain/address.value-object";
import { Address as AddressModel } from "../model/address.model";

@Injectable()
export class MapperService {
  public mapToDomainObject(
    addressDto?: AddressDto | AddressModel,
  ): Address | undefined {
    if (!addressDto) return undefined;
    return Address.create(
      addressDto.country,
      addressDto.city,
      addressDto.postalCode,
      addressDto.street,
      addressDto.house,
      addressDto.region,
      addressDto.apartment,
    );
  }

  public mapToViewObject(
    address?: Address | AddressDto,
  ): AddressModel | undefined {
    if (!address) return undefined;
    return {
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      street: address.street,
      house: address.house,
      region: address.region,
      apartment: address.apartment,
    } as AddressModel;
  }
}
