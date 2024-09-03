import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Updates {
    @ApiProperty()
    createdBy: string;
    @ApiProperty()
    createdAt: Date;

    @ApiPropertyOptional()
    updatedBy?: string;

    @ApiPropertyOptional()
    updatedAt?: Date;

    @ApiPropertyOptional()
    publishedBy?: string;

    @ApiPropertyOptional()
    publishedAt?: Date;
}