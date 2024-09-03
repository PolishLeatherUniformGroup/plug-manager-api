import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SectionsService } from '../services/sections.service';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSection } from '../dtos/create-section.dto';
import { Section } from '../dtos/section.dto';
import { Publish } from '../dtos/publish.dto';
import { Reparent } from '../dtos/reparent.dto';
import { SectionResult } from '../dtos/get-section.dto';
import { ArticleResult } from '../dtos/get-article.dto';
import { Reorder } from '../dtos/reorder.dto';
import { ArticleItem } from '../dtos/article-item.dto';

@Controller('sections')
@ApiTags('CMS')
export class SectionsController {

    constructor(private readonly sectionsService: SectionsService) { }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    createSection(@Body() createSectionDto: CreateSection) {
        return this.sectionsService.createSection(createSectionDto);
    }

    @Put(':id')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    updateSection(id, @Body() sectionDto: CreateSection) {
        return this.sectionsService.updateSection(id, sectionDto);
    }

    @Put(':id/publication')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    publishingSection(@Param('id') id: number, @Body() publishDto: Publish) {
        if (publishDto.published) {
            return this.sectionsService.publishSection(id, publishDto);
        } else {
            return this.sectionsService.unPublishSection(id, publishDto);
        }
    }

    @Put(':id/parent')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    reparentSection(@Param('id') id: number, @Body() reparentDto: Reparent) {
        return this.sectionsService.reparentSection(id, reparentDto);
    }

    @Put(':id/order')
    @ApiAcceptedResponse({ description: 'The record has been successfully updated.' })
    reorderSection(@Param('id') id: number, @Body() reorderDto: Reorder) {
        return this.sectionsService.reorderSection(id, reorderDto);
    }

    @Get(':id')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: SectionResult })
    getSection(@Param('id') id: number) {
        return this.sectionsService.getSection(id);
    }

    @Get()
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: SectionResult, isArray: true })
    getSections() {
        return this.sectionsService.getSections();
    }

    @Get(':id/articles')
    @ApiOkResponse({ description: 'The record has been successfully retrieved.', type: ArticleItem, isArray: true })
    getSectionArticles(@Param('id') id: number) {
        return this.sectionsService.getSectionArticles(id);
    }
}


