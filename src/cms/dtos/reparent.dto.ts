import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Reparent {

    @ApiPropertyOptional()
    parent?: number;

    @ApiProperty()
    updatedBy: string;

    @ApiProperty()
    updatedAt: Date;
}