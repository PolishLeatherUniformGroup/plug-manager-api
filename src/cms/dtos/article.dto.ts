import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Metadata } from "./metadata.dto";

export class Article {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    content: string;

    @ApiPropertyOptional()
    headerImage?: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    inMenu: boolean;

    @ApiProperty()
    isDefault: boolean;

    @ApiProperty()
    language: string;

    @ApiProperty()
    order: number;

    @ApiProperty()
    section: number;

    @ApiPropertyOptional()
    metadata?: Metadata;
}