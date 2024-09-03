import { Body, Controller, Post } from '@nestjs/common';
import { SettingsService } from '../services/settings.service';
import { OrganizationFee } from '../dto/requests/organization-fee';
import { ApiTags } from '@nestjs/swagger';

@Controller('settings')
@ApiTags("Settings")
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Post('fees')
    async addFee(@Body() fee: OrganizationFee): Promise<void> {
        await this.settingsService.addFee(fee.year, fee.baseAmount, fee.baseDue);
    }

}
