import { ApiProperty } from "@nestjs/swagger";

export class OrganizationFee {
    @ApiProperty()
    year: number;
    @ApiProperty()
    baseAmount: number;
    @ApiProperty()
    baseDue: Date;
}