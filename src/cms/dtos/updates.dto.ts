import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Updates {
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    createdBy: string;
    @ApiPropertyOptional()
    updatedAt?: Date;
    @ApiPropertyOptional()
    updatedBy?: string;
    @ApiPropertyOptional()
    publihedAt?: Date;
    @ApiPropertyOptional()
    publishedBy?: string;
}