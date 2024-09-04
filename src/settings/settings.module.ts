import { Module } from '@nestjs/common';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFeature } from './model/feature.model';
import { ConfigurationController } from './controllers/configuration.controller';
import { ConfigurationService } from './services/configuration.service';
import { Config } from './model/config.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationFeature, Config
    ]),
  ],
  controllers: [FeaturesController, ConfigurationController],
  providers: [FeaturesService, ConfigurationService]
})
export class SettingsModule { }
