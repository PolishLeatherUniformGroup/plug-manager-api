import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleInfo, CreateSection, GetTranslatedSection, MenuItem, PublishSection, ReparentSection, Section, UpdateSection } from '../dtos/section.dto';
import { SectionsService } from '../services/sections.service';


@Controller('sections')
@ApiTags('CMS')
export class SectionsController {
    private readonly logger = new Logger(SectionsController.name);

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


    @Get('menu/:lang')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: MenuItem, isArray: true })
    async getMenu(@Param('lang') lang: string) {
        this.logger.log(`Getting menu for languag= ${lang}`);
        return await this.sectionService.getMenu(lang);
    }

    @Get()
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: Section, isArray: true })
    async getSections() {
        return await this.sectionService.getSections();
    }
}


