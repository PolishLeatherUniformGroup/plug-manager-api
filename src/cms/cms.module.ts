import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesController } from './controllers/articles.controller';
import { SectionsController } from './controllers/sections.controller';
import { ArticlesService } from './services/articles.service';
import { SectionsService } from './services/sections.service';
import { Section } from './model/section.model';
import { Article } from './model/article.model';


@Module({
  imports: [TypeOrmModule.forFeature([
    Section, Article
  ]),
    CqrsModule],
  controllers: [SectionsController, ArticlesController],
  providers: [ArticlesService, SectionsService],
})
export class CmsModule { }
