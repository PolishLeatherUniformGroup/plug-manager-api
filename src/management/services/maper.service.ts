import { Injectable } from "@nestjs/common";
import { AddressDto } from '../dto/address.dto';
import { Address } from "../domain/address.value-object";
import { Address as AddressModel } from "../model/applicants/address"

@Injectable()
export class MapperService {

    public mapToDomainObject(addressDto?: AddressDto | AddressModel): Address | undefined {
        if (!addressDto) return undefined;
        return Address.create(
            addressDto.country,
            addressDto.city,
            addressDto.postalCode,
            addressDto.street,
            addressDto.house,
            addressDto.region,
            addressDto.apartment);
    }

}