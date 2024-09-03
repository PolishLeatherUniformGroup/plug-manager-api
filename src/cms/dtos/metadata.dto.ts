import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Updates } from "./updates.dto";

export class Metadata {

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    keywords?: string[];

    @ApiProperty()
    history: Updates;
}