import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleInfo, CreateSection, GetTranslatedSection, MenuItem, PublishSection, ReparentSection, Section, UpdateSection } from '../dtos/section.dto';
import { SectionsService } from '../services/sections.service';


@Controller('sections')
@ApiTags('CMS')
export class SectionsController {

    constructor(private readonly sectionService: SectionsService) { }

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

    @Get(':lang')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: GetTranslatedSection, isArray: true })
    async getSections(@Param('lang') lang: string) {
        return await this.sectionService.getSections(lang);
    }

    @Get(':lang/:slug/subsections')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: GetTranslatedSection, isArray: true })
    async getSubSections(@Param('lang') lang: string, @Param('slug') slug: string) {
        return await this.sectionService.getSubSections(lang, slug);
    }

    @Get(':lang/:slug/content')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: GetTranslatedSection })
    getSectionContent(@Param('slug') slug: string, @Param('lang') lang: string) {
        throw new Error('Not implemented');
    }

    @Get(':lang/:slug/articles')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: ArticleInfo, isArray: true })
    async getSectionArticles(@Param('slug') slug: string, @Param('lang') lang: string) {
        return await this.sectionService.getOwnedArticles(lang, slug);
    }

    @Get(':lang/menu')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: MenuItem, isArray: true })
    async getMenu(@Param('lang') lang: string) {
        return await this.sectionService.getMenu(lang);
    }
}


