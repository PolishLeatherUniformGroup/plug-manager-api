import { ApiProperty } from "@nestjs/swagger";

export class MembershipFee {
    @ApiProperty()
    public year: number;
    @ApiProperty()
    public dueAmount: number;
    @ApiProperty()
    public dueDate: Date;
}