import { Module } from '@nestjs/common';
import { SectionsController } from './controllers/sections.controller';
import { SectionsService } from './services/sections.service';
import { ArticlesController } from './controllers/articles.controller';
import { ImagesController } from './controllers/images.controller';
import { ImagesService } from './services/images.service';
import { ArticlesService } from './services/articles.service';


@Module({
  controllers: [SectionsController, ArticlesController, ImagesController],
  providers: [SectionsService, ImagesService, ArticlesService],
})
export class CrmModule {}
