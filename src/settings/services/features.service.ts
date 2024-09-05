import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplicationFeature } from '../model/feature.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature as FeatureDto } from '../dto/feature.dto';
import { AddFeature } from '../dto/add-feature.dto';
import { Switch } from '../dto/switch.dto';
import { log } from 'console';


@Injectable()
export class FeaturesService {

    private readonly logger = new Logger(FeaturesService.name);
    constructor(@InjectRepository(ApplicationFeature) private readonly repository: Repository<ApplicationFeature>) { }

    public async getFeatures(): Promise<FeatureDto[]> {
        const entities: ApplicationFeature[] = await this.repository.find();
        this.logger.debug(`Found ${entities.length} features`);
        return entities.map(entity => {
            this.logger.debug(`Mapping feature ${entity.id}: ${JSON.stringify(entity)}`);
            return {
                id: entity.id,
                key: entity.key,
                name: entity.name,
                description: entity.description,
                enabled: entity.enabled
            } as FeatureDto;
        });
    }

    public async addFeature(feature: AddFeature) {
        var entity = this.repository.create();
        entity.name = feature.name;
        entity.description = feature.description;
        entity.enabled = false;
        await this.repository.save(entity);
    }

    public async switch(id: number, body: Switch) {
        var entity = await this.repository.findOneBy({ id });
        entity.enabled = body.enabled;
        await this.repository.save(entity);
    }

    async getFeature(key: string): Promise<FeatureDto | null> {
        var entity = await this.repository.findOneBy({ key: key });
        if (!entity) {
            return null;
        }
        return {
            id: entity.id,
            key: entity.key,
            name: entity.name,
            description: entity.description,
            enabled: entity.enabled
        } as FeatureDto;
    }
}
