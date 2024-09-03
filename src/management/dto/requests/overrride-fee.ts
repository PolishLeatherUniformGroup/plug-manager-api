import { ApiProperty } from "@nestjs/swagger";

export class OverrideFee {
    @ApiProperty()
    public year: number;
    @ApiProperty()
    public dueAmount: number;
    @ApiProperty()
    public dueDate: Date;
}