import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateArticle } from '../dtos/create-article.dto';
import { Publish } from '../dtos/publish.dto';
import { Reorder } from '../dtos/reorder.dto';
import { Reparent } from '../dtos/reparent.dto';
import { Article } from '../dtos/article.dto';

@Controller('articles')
@ApiTags('CMS')
export class ArticlesController {

    @Post()
    @ApiCreatedResponse({ description: 'Article created' })
    createArticle(@Body() createArticleDto: CreateArticle) {
        return 'Article created';
    }

    @Put(':id')
    @ApiAcceptedResponse({ description: 'Article updated' })
    updateArticle(@Param('id') id: number, @Body() updateArticleDto: CreateArticle) {
        return 'Article updated';
    }

    @Put(':id/publication')
    @ApiAcceptedResponse({ description: 'Article published' })
    publishArticle(@Param('id') id: number, @Body() publishDto: Publish) {
        return 'Article published';
    }

    @Put(':id/order')
    @ApiAcceptedResponse({ description: 'Article order updated' })
    updateArticleOrder(@Param('id') id: number, @Body() reorderDto: Reorder) {
        return 'Article order updated';
    }

    @Put(':id/parent')
    @ApiAcceptedResponse({ description: 'Article parent updated' })
    updateArticleParent(@Param('id') id: number, @Body() reparentDto: Reparent) {
        return 'Article parent updated';
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Article retrieved', type: Article, isArray: false })
    getArticle(@Param('id') id: number): Promise<Article[]> {
        throw new Error('Method not implemented.');
    }
}



