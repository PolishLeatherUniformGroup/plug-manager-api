import { ApiProperty } from "@nestjs/swagger";

export class ApplicationFee {
    @ApiProperty()
    public amountPaid: number;
    @ApiProperty()
    public paymentDate: Date;
}