import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Feature } from '../dto/feature.dto';
import { AddFeature } from '../dto/add-feature.dto';
import { Switch } from '../dto/switch.dto';
import { FeaturesService } from '../services/features.service';

@Controller('features')
@ApiTags('Configuration')
export class FeaturesController {
    constructor(private readonly featureService: FeaturesService) { }

    @Get()
    @ApiOkResponse({ type: Feature, isArray: true })
    public async getFeatures(): Promise<Feature[]> {
        return this.featureService.getFeatures();
    }

    @Get(':key')
    @ApiOkResponse({ type: Feature, isArray: true })
    public async getFeature(@Param('key') key:string): Promise<Feature> {
        return this.featureService.getFeature(key);
    }

    @Post()
    public async addFeature(@Body() feature: AddFeature) {
        await this.featureService.addFeature(feature);
    }

    @Put(':id/switch')
    public async switch(@Param('id') id: number, @Body() body: Switch) {
        await this.featureService.switch(id, body);
    }
}
