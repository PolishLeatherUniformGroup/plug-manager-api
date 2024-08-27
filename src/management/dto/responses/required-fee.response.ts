import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RequiredFee {

    @ApiProperty()
    public requiredAmount: number;

    @ApiPropertyOptional()
    public paidAmount?: number;

    @ApiPropertyOptional()
    public paymentDate?: Date;
}