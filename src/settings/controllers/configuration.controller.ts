import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from '../services/configuration.service';
import { ConfigValue } from '../dto/config-value.dto';
import { EditConfigValue } from '../dto/edit-config-value.dto';

@Controller('config')
@ApiTags('Configuration')
export class ConfigurationController {
    private readonly logger = new Logger(ConfigurationController.name);
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

    @Put(':key')
    public async updateConfigurationValue(@Param('key') key: string, @Body() body: EditConfigValue) {
        this.logger.log(`Received request to update config ${key} with ${JSON.stringify(body)}`);
        const { value } = body;
        await this.configurationService.updateValue(key, value);
    }
}
