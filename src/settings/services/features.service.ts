import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplicationFeature } from '../model/feature.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature as FeatureDto } from '../dto/feature.dto';
import { AddFeature } from '../dto/add-feature.dto';
import { Switch } from '../dto/switch.dto';


@Injectable()
export class FeaturesService {
    constructor(@InjectRepository(ApplicationFeature) private readonly repository: Repository<ApplicationFeature>) { }

    public async getFeatures(): Promise<FeatureDto[]> {
        const entities = await this.repository.find();
        return entities.map(entity => ({
            id: entity.id,
            name: entity.name,
            description: entity.description,
            enabled: entity.enabled
        }));
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
}
