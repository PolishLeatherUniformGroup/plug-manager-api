import { ApiProperty } from "@nestjs/swagger";

export class Appeal {
    @ApiProperty()
    public justification: string;
    @ApiProperty()
    public date: Date;
}