import { Module } from '@nestjs/common';
import { SectionsController } from './controllers/sections.controller';
import { SectionsService } from './services/sections.service';
import { ArticlesController } from './controllers/articles.controller';
import { ImagesController } from './controllers/images.controller';
import { ImagesService } from './services/images.service';
import { ArticlesService } from './services/articles.service';
import { CdnController } from './controllers/cdn.controller';
import { Article } from './model/article.model';
import { Section } from './model/section.model';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Article, Section
    ]),
  ],
  controllers: [SectionsController, ArticlesController, ImagesController, CdnController],
  providers: [SectionsService, ImagesService, ArticlesService],
})
export class CmsModule { }
