import { Module } from '@nestjs/common';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFeature } from './model/feature.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationFeature,
    ]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService]
})
export class SettingsModule { }
