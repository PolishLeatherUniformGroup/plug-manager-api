import { ApiProperty } from "@nestjs/swagger";

export class Switch {
    @ApiProperty()
    enabled: boolean;
}