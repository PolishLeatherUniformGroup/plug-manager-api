import { Injectable } from "@nestjs/common";
import { AddressDto } from '../dto/address.dto';
import { Address } from "../domain/address.value-object";

@Injectable()
export class MapperService {

    public mapToDomainObject(addressDto: AddressDto): Address {
        return Address.create(
            addressDto.country,
            addressDto.city,
            addressDto.postalCode,
            addressDto.street,
            addressDto.house,
            addressDto.region,
            addressDto.appartment);
    }
}