import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../model/section.model';
import { Repository } from 'typeorm';
import { ArticleInfo, GetTranslatedSection, MenuItem, SectionTranslation } from '../dtos/section.dto';
import { Section as SectionDto } from '../dtos/section.dto';

@Injectable()
export class SectionsService {
    private readonly logger = new Logger(SectionsService.name);

    constructor(
        @InjectRepository(Section)
        private readonly sectionRepository: Repository<Section>,
    ) { }


    async getSections() {
        const sections = await this.sectionRepository.find({
            where: {
                parent: null,
            }, relations: ['content', 'parent'], order: { order: 'ASC' }
        });
        return sections.filter(x => x.parent === undefined || x.parent === null).map(section => {
            return {
                id: section.id,
                slug: section.slug,
                order: section.order,
                isPublished: section.isPublished,
                showInMenu: section.showInMenu,
            } as SectionDto;
        });
    }
    async getSubSections(lang: string, slug: string) {
        const sections = await this.sectionRepository.find({
            where: {
                parent: { slug: slug },
                isPublished: true,
                content: { language: lang }
            }, relations: ['content', 'parent']
        });
        return sections.map(section => {
            return {
                id: section.id,
                slug: section.slug,
                order: section.order,
                isPublished: section.isPublished,
                showInMenu: section.showInMenu,
                metadata: section.metadata,
                content: section.content[0] as SectionTranslation,
                updates: section.updates
            } as GetTranslatedSection
        });
    }
    async getOwnedArticles(lang: string, slug: string) {

        const section = await this.sectionRepository.findOne({
            where: {
                slug: slug,
                isPublished: true,
                articles: {
                    isPublished: true,
                    content: {
                        language: lang
                    }
                }
            }, relations: ['articles']
        });

        return section.articles.map(article => {
            return {
                slug: article.slug,
                name: article.content[0].name,
                isPublished: article.isPublished
            } as ArticleInfo;
        });

    }

    async getMenu(lang: string): Promise<MenuItem[]> {
        const sections = await this.sectionRepository.find({
            where: {
                isPublished: true,
                showInMenu: true,
                parent: null,
                content: { language: lang },
            }, relations: ['content', 'parent', 'children', 'articles', 'articles.content', 'children.articles', 'children.content', 'children.articles.content']
        });
        this.logger.log(`Found ${sections.length} sections`);
        return sections.filter(x => x.parent === null).map(section => {
            return {
                slug: section.slug,
                name: section.content[0].name,
                pages: section.articles.map(article => {
                    return {
                        slug: article.slug,
                        name: article.content.find(t => t.language === lang).name,
                        isPublished: article.isPublished
                    } as ArticleInfo;
                }),
                submenu: section.children.map(child => {
                    return {
                        slug: child.slug,
                        name: child.content.find(t => t.language === lang).name,
                        pages: child.articles.map(article => {
                            return {
                                slug: article.slug,
                                name: article.content.find(t => t.language === lang).name,
                                isPublished: article.isPublished
                            } as ArticleInfo;
                        }),
                        submenu: []
                    } as MenuItem
                })
            } as MenuItem;
        });
    }

    /*
    submenu: section.children.map(child => {
        return {
            slug: child.slug,
            content: child.content[0] as SectionTranslation,
            pages: child.articles.map(article => {
                return {
                    slug: article.slug,
                    name: article.content[0].name,
                    isPublished: article.isPublished
                } as ArticleInfo;
            }),
            submenu: []
        } as MenuItem;
    })
*/
}
