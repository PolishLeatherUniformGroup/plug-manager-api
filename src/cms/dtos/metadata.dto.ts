import { ApiPropertyOptional } from "@nestjs/swagger";

export class Metadata {
    @ApiPropertyOptional()
    keywords?: string;
    @ApiPropertyOptional()
    description?: string;
}