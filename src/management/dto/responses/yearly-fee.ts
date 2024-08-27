import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class YearlyFee {
    @ApiProperty()
    public year: number;
    @ApiProperty()
    public dueAmount: number;
    @ApiProperty()
    public dueDate: Date;
    @ApiPropertyOptional()
    public paidAmount?: number;
    @ApiPropertyOptional()
    public paidDate?: Date;

}