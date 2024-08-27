import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../address.dto";

export class Member{

    @ApiProperty()
    public id: string;

    @ApiProperty()
    public cardNumber: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public address: Address;

    @ApiProperty()
    public birthDate: Date;

    @ApiProperty()
    public joinDate: Date;

    @ApiProperty()
    public phoneNumber?: string;

    @ApiProperty()
    public status:number;

    @ApiProperty()
    public feeOverdue: boolean;
}