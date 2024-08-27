import { ApiProperty } from "@nestjs/swagger";

export class Suspension{

    @ApiProperty()
    public startDate: Date;

    @ApiProperty()
    public endDate: Date;

    @ApiProperty()
    public reason: string;

    @ApiProperty()
    public appealDeadline:Date;
}