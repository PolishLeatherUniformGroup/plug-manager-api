import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { Service } from './sections/services/.service';

@Module({
  controllers: [SectionsController],
  providers: [Service]
})
export class BlogModule {}
