import { ApiProperty } from "@nestjs/swagger";

export class Reorder {
    @ApiProperty()
    order: number;

    @ApiProperty()
    updatedBy: string;

    @ApiProperty()
    updatedAt: Date;
}