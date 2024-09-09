import { Injectable, Logger } from '@nestjs/common';
import { Section } from '../model/section.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionContent } from '../model/section-content.model';
import { ArticleContent } from '../model/article-content.model';
import { Article } from '../model/article.model';
import { log } from 'console';
import { Err } from '@opentelemetry/instrumentation-http';


@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    constructor(
        @InjectRepository(Section)
        private readonly sectionRepository: Repository<Section>,
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    public async seed() {

        const orgSection = await this.insertSection('organization', 0, [
            { name: 'Stowarzyszenie', title: 'Stowarzyszenie', language: 'pl' },
            { name: 'Association', title: 'Association', language: 'en' }
        ]);
        const privacySection = await this.insertSection('privacy', 0, [
            { name: 'Ochrona danych', title: 'Ochrona danych', language: 'pl' },
            { name: 'Data protection', title: 'Data protection', language: 'en' }
        ], orgSection);

        const policy = await this.insertArticle(privacySection, 'privacy-policy', 0, [
            { name: 'Polityka prywatności', title: 'Polityka prywatności', text: 'Polityka prywatności', language: 'pl' },
            { name: 'Privacy policy', title: 'Privacy policy', text: 'Privacy policy', language: 'en' }
        ]);
        this.logger.log(`Policy id: ${policy}`);

        await this.insertArticle(privacySection, 'gdpr-policy', 1, [
            { name: 'Informacja RODO', title: 'Informacja RODO', text: 'Klauzula informacyjna RODO', language: 'pl' },
            { name: 'GDPR information', title: 'GDPR information', text: 'GDPR Caluse', language: 'en' }
        ]);

    }

    private async insertSection(slug: string, order: number, content: { name: string, title: string, language: string }[], parent?: number): Promise<number> {

        if (! await this.sectionExists(slug)) {
            this.logger.log(`Inserting section ${slug}`);
            const section = this.sectionRepository.create();
            section.slug = slug;
            section.order = order;
            section.isPublished = true;
            section.showInMenu = true;
            section.metadata = {
            };
            section.content = content.map(c => ({
                name: c.name,
                title: c.title,
                language: c.language,
                section: section,
                sectionId: section.id
            } as SectionContent));

            section.updates = {
                createdAt: new Date(),
                createdBy: "System"
            };

            await this.sectionRepository.save(section);
            return section.id;
        } else {
            this.logger.log(`Returning id of  section ${slug}`);
            return (await this.sectionRepository.findOne({ where: { slug } })).id;
        }

    }

    private async insertArticle(section: number, slug: string, order: number, content: { name: string, title: string, text: string, language: string }[]): Promise<number> {
        if (! await this.articleExists(slug)) {
            try {
                this.logger.log(`Inserting article ${slug}`);
                const parent = await this.sectionRepository.findOne({ where: { id: section }, relations: ['articles'] });
                this.logger.log(`Parent found ${parent.slug}`);
                const article = this.articleRepository.create();
                article.slug = slug;
                article.order = order;
                article.isPublished = true;
                article.metadata = {
                };
                article.content = content.map(c => ({
                    name: c.name,
                    title: c.title,
                    text: c.text,
                    language: c.language,
                    article: article,
                    articleId: article.id
                } as ArticleContent));

                article.updates = {
                    createdAt: new Date(),
                    createdBy: "System"
                };
                article.parentId = parent.id;
                this.logger.log(`Saving parent ${parent.id}`);
                await this.articleRepository.save(article);
                this.logger.log(`Article ${slug} saved`);
                return article.id;
            } catch (e) {
                this.logger.error(e, e.stack);
            }
        }
    }

    private async sectionExists(slug: string): Promise<boolean> {
        return await this.sectionRepository.existsBy({ slug });
    }

    private async articleExists(slug: string): Promise<boolean> {
        return await this.articleRepository.existsBy({ slug });
    }
}
