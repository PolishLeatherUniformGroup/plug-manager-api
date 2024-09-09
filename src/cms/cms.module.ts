import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';


@Module({
  imports: [TypeOrmModule.forFeature([
  ]),
    CqrsModule],
  controllers: [SectionsController],
  providers: [],
})
export class CmsModule { }
