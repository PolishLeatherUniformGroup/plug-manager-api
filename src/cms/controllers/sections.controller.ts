import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleInfo, CreateSection, GetTranslatedSection, PublishSection, ReparentSection, Section, UpdateSection } from '../dtos/section.dto';


@Controller('sections')
@ApiTags('CMS')
export class SectionsController {

    constructor() { }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    createSection(@Body() createSectionDto: CreateSection) {
        throw new Error('Not implemented');
    }

    @Put(':id')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    updateSection(id, @Body() sectionDto: UpdateSection) {
        throw new Error('Not implemented');
    }

    @Put(':id/publication')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    publishingSection(@Param('id') id: number, @Body() publishDto: PublishSection) {
        throw new Error('Not implemented');
    }

    @Put(':id/parent')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    reparentSection(@Param('id') id: number, @Body() reparentDto: ReparentSection) {
        throw new Error('Not implemented');
    }


    @Get(':slug')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: Section })
    getSection(@Param('slug') slug: string) {
        throw new Error('Not implemented');
    }

    @Get()
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: Section, isArray: true })
    getSections() {
        throw new Error('Not implemented');
    }

    @Get(':slug/content/:lang')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: GetTranslatedSection })
    getSectionContent(@Param('slug') slug: string,@Param('lang') lang: string) {
        throw new Error('Not implemented');
    }

    @Get(':slug/articles')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: ArticleInfo, isArray: true })
    getSectionArticles(@Param('slug') slug: string) {
        throw new Error('Not implemented');
    }
}


