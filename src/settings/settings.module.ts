import { Module } from '@nestjs/common';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFeature } from './model/feature.model';
import { ConfigurationController } from './controllers/configuration.controller';
import { ConfigurationService } from './services/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationFeature,
    ]),
  ],
  controllers: [FeaturesController, ConfigurationController],
  providers: [FeaturesService, ConfigurationService]
})
export class SettingsModule { }
