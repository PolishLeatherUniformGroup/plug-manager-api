import { ApiProperty } from "@nestjs/swagger";

export class MembershipFeePayment {
    @ApiProperty()
    public amount: number;
    @ApiProperty()
    public date: Date;
}