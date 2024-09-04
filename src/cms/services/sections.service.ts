import { Injectable } from '@nestjs/common';
import { CreateSection } from '../dtos/create-section.dto';
import { Publish } from '../dtos/publish.dto';
import { Reparent } from '../dtos/reparent.dto';
import { SectionResult } from '../dtos/get-section.dto';
import { Reorder } from '../dtos/reorder.dto';
import { CommandBus } from "@nestjs/cqrs";
import { CreateSectionCommand } from '../commands/impl/create-section.command';
import { UpdateSectionCommand } from '../commands/impl/update-section.command';
import { PublishSectionCommand } from '../commands/impl/publish-section.command';
import { UnPublishSectionCommand } from '../commands/impl/un-publish-section.command';
import { ReparentSectionCommand } from '../commands/impl/reparent-section.command';

@Injectable()
export class SectionsService {

    constructor(private readonly commandBus: CommandBus) { }

    public async createSection(createSectionDto: CreateSection): Promise<void> {
        let command = new CreateSectionCommand(
            createSectionDto.slug,
            createSectionDto.title,
            createSectionDto.inMenu,
            createSectionDto.metadata?.history.createdBy,
            createSectionDto.metadata?.history.createdAt,
            createSectionDto.language,
            createSectionDto.order,
            createSectionDto.parent,
            createSectionDto.metadata?.description,
            createSectionDto.metadata?.keywords
        );
        await this.commandBus.execute(command);
    }

    public async updateSection(id: number, sectionDto: CreateSection) {
        let command = new UpdateSectionCommand(
            id,
            sectionDto.title,
            sectionDto.inMenu,
            sectionDto.metadata?.history.updatedBy,
            sectionDto.metadata?.history.updatedAt,
            sectionDto.metadata?.description,
            sectionDto.metadata?.keywords
        );
        await this.commandBus.execute(command);
    }

    public async publishSection(id: number, publishDto: Publish) {
        let command = new PublishSectionCommand(
            id,
            publishDto.publishedBy,
            publishDto.publishedAt
        );
        await this.commandBus.execute(command);
    }

    public async unPublishSection(id: number, publishDto: Publish) {
        let command = new UnPublishSectionCommand(
            id,
            publishDto.publishedBy,
            publishDto.publishedAt
        );
        await this.commandBus.execute(command);
    }

    public async reparentSection(id: number, reparentDto: Reparent) {
        let command = new ReparentSectionCommand(
            id,
            reparentDto.updatedBy,
            reparentDto.updatedAt,
            reparentDto.parent
        );
        await this.commandBus.execute(command);
    }

    public async reorderSection(id: number, reorderDto: Reorder) {
        throw new Error('Method not implemented.');
    }

    getSection(id: number): Promise<SectionResult> {
        throw new Error('Method not implemented.');
    }

    getSections(): Promise<SectionResult[]> {
        throw new Error('Method not implemented.');
    }

    getSectionArticles(id: number) {
        throw new Error('Method not implemented.');
    }
}
