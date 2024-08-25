import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class AddressDto {
    @ApiProperty()
    country: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    house: string;

    @ApiPropertyOptional()
    apartment?: string;

    @ApiPropertyOptional()
    region?: string;
}