import { Module, OnModuleInit } from '@nestjs/common';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFeature } from './model/feature.model';
import { ConfigurationController } from './controllers/configuration.controller';
import { ConfigurationService } from './services/configuration.service';
import { SettingValue } from './model/config.model';
import { SeedService } from './services/seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationFeature, SettingValue
    ]),
  ],
  controllers: [FeaturesController, ConfigurationController],
  providers: [FeaturesService, ConfigurationService, SeedService]
})
export class SettingsModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) { }

  async onModuleInit() {
    await this.seedService.seed();
  }
}
