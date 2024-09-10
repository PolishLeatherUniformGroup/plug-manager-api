import { ApiProperty, ApiPropertyOptional, OmitType, PickType } from "@nestjs/swagger";
import { Metadata } from "./metadata.dto";
import { Updates } from "./updates.dto";

export class Section {
    @ApiProperty()
    id: number;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    order: number;
    @ApiProperty()
    isPublished: boolean;
    @ApiProperty()
    showInMenu: boolean;
    @ApiPropertyOptional()
    metadata?: Metadata;
    @ApiPropertyOptional()
    updates: Updates;
    @ApiPropertyOptional()
    parent?: number;
}

export class SectionTranslation {
    @ApiProperty()
    language: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    title: string;
}

export class ArticleInfo {
    @ApiProperty()
    slug: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    isPublished: boolean;
}

export class CreateSection extends OmitType(Section, ['id', 'updates']) {
    @ApiProperty()
    translations: SectionTranslation[];
    @ApiProperty()
    author: string;
}

export class UpdateSection extends PickType(Section, ['showInMenu', 'order', 'metadata']) {
    @ApiPropertyOptional()
    translations: SectionTranslation[];
    @ApiProperty()
    author: string;
}

export class PublishSection extends PickType(Section, ['isPublished']) {
    @ApiProperty()
    author: string;
}

export class ReparentSection extends PickType(Section, ['parent']) {
    @ApiProperty()
    author: string;
}

export class GetTranslatedSection extends PickType(Section, ['id', 'slug', 'isPublished', 'showInMenu', 'updates', 'parent']) {
    @ApiProperty()
    content: SectionTranslation;
}

export class MenuItem {
    @ApiProperty()
    slug: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    pages: ArticleInfo[];
    @ApiProperty()
    submenu: MenuItem[];
}