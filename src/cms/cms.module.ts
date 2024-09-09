import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesController } from './controllers/articles.controller';
import { SectionsController } from './controllers/sections.controller';
import { ArticlesService } from './services/articles.service';
import { SectionsService } from './services/sections.service';
import { Section } from './model/section.model';
import { Article } from './model/article.model';
import { SectionContent } from './model/section-content.model';
import { ArticleContent } from './model/article-content.model';
import { SeedService } from './services/seed.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    Section, Article, SectionContent, ArticleContent
  ]),
    CqrsModule],
  controllers: [SectionsController, ArticlesController],
  providers: [ArticlesService, SectionsService, SeedService],
})
export class CmsModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) { }
  async onModuleInit() {
    await this.seedService.seed();
  }
}
