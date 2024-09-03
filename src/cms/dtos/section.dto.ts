import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Metadata } from "./metadata.dto";

export class Section {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    inMenu: boolean;

    @ApiProperty()
    language: string;

    @ApiProperty()
    order: number;

    @ApiPropertyOptional()
    parent?: number;

    @ApiPropertyOptional()
    metadata?: Metadata;
}