import { Injectable } from '@nestjs/common';
import { CreateSection } from '../dtos/create-section.dto';
import { Publish } from '../dtos/publish.dto';
import { Reparent } from '../dtos/reparent.dto';
import { SectionResult } from '../dtos/get-section.dto';
import { Reorder } from '../dtos/reorder.dto';

@Injectable()
export class SectionsService {

    public async createSection(createSectionDto: CreateSection): Promise<number> {
        return 0;
    }

    public async updateSection(id: number, sectionDto: CreateSection) {

    }

    public async publishSection(id: number, publishDto: Publish) {

    }

    public async unPublishSection(id: number, publishDto: Publish) { }

    public async reparentSection(id: number, reparentDto: Reparent) {
        throw new Error('Method not implemented.');
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
