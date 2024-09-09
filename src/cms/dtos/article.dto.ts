import { ApiProperty, ApiPropertyOptional, OmitType, PickType } from "@nestjs/swagger";
import { Updates } from "./updates.dto";
import { Metadata } from "./metadata.dto";

export class Article{
    @ApiProperty()
    id: number;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    order: number;
    @ApiProperty()
    isPublished: boolean;

    @ApiPropertyOptional()
    metadata?: Metadata;
    @ApiPropertyOptional()
    updates: Updates;
    @ApiPropertyOptional()
    parent?: number;
}

export class ArticleTranslation {
    @ApiProperty()
    language: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    text: string;
}

export class CreateArticle extends OmitType(Article, ['id', 'updates']) {
    @ApiProperty()
    translations: ArticleTranslation[];
    @ApiProperty()
    author: string;
}

export class UpdateArticle extends PickType(Article, [ 'order', 'metadata']) {
    @ApiPropertyOptional()
    translations: ArticleTranslation[];
    @ApiProperty()
    author: string;
}

export class PublishArticle extends PickType(Article, ['isPublished']) {
    @ApiProperty()
    author: string;
}

export class ReparentArticle extends PickType(Article, ['parent']) {
    @ApiProperty()
    author: string;
}

export class GetTranslatedArticle extends PickType(Article, ['id', 'slug', 'isPublished', 'updates', 'parent']) {
    @ApiProperty()
    content: ArticleTranslation;
}