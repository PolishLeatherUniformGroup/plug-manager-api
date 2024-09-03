import { Module } from '@nestjs/common';
import { SectionsController } from './controllers/sections.controller';
import { SectionsService } from './services/sections.service';


@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class CrmModule {}
