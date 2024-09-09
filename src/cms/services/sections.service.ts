import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../model/section.model';
import { Repository } from 'typeorm';
import { GetTranslatedSection, SectionTranslation } from '../dtos/section.dto';

@Injectable()
export class SectionsService {
    constructor(
        @InjectRepository(Section)
        private readonly sectionRepository: Repository<Section>,
    ) { }


    async getSections(lang: string) {
        const sections = await this.sectionRepository.find({
            where: {
                parent: null,
                isPublished: true,
                content: { language: lang }
            }, relations: ['content', 'parent']
        });
        return sections.filter(x => x.parent === undefined || x.parent === null).map(section => {
            return {
                id: section.id,
                slug: section.slug,
                order: section.order,
                isPublished: section.isPublished,
                showInMenu: section.showInMenu,
                metadata: section.metadata,
                content: section.content[0] as SectionTranslation,
                updates: section.updates
            } as GetTranslatedSection;
        });
    }
}
