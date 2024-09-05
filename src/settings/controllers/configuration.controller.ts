import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from '../services/configuration.service';
import { ConfigValue } from '../dto/config-value.dto';

@Controller('config')
@ApiTags('Configuration')
export class ConfigurationController {
    constructor(private readonly configurationService: ConfigurationService) { }

    @Get(':key')
    @ApiOkResponse({ type: ConfigValue })
    public async getConfigurationValue(@Param('key') key: string) {
        return this.configurationService.getValue(key);
    }

    @Get()
    @ApiOkResponse({ type: ConfigValue, isArray: true })
    public async getConfigurationValues() {
        return this.configurationService.getValues();
    }
}
