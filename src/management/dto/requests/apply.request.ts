import { ApiProperty } from "@nestjs/swagger";
import { Address as AddressDto } from "../address.dto";

export class Apply {
    @ApiProperty()
    public firstName: string;
    @ApiProperty()
    public lastName: string;
    @ApiProperty()
    public email: string;
    @ApiProperty({ required: false })
    public phoneNumber?: string;
    @ApiProperty()
    public address: AddressDto;
    @ApiProperty()
    public recommenders: string[];
}