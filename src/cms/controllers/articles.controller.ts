import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Article, CreateArticle, GetTranslatedArticle, PublishArticle, ReparentArticle, UpdateArticle } from '../dtos/article.dto';

@Controller('articles')
@ApiTags('CMS')
export class ArticlesController {
    constructor() { }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    createArticle(@Body() createArticleDto: CreateArticle) {
        throw new Error('Not implemented');
    }

    @Put(':id')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    updateArticle(id, @Body() ArticleDto: UpdateArticle) {
        throw new Error('Not implemented');
    }

    @Put(':id/publication')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    publishingArticle(@Param('id') id: number, @Body() publishDto: PublishArticle) {
        throw new Error('Not implemented');
    }

    @Put(':id/parent')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    reparentArticle(@Param('id') id: number, @Body() reparentDto: ReparentArticle) {
        throw new Error('Not implemented');
    }

    @Get(':slug')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: Article })
    getArticle(@Param('slug') slug: string) {
        throw new Error('Not implemented');
    }

    @Get(':slug/content/:lang')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: GetTranslatedArticle })
    getArticleContent(@Param('slug') slug: string,@Param('lang') lang: string) {
        throw new Error('Not implemented');
    }

    
}
