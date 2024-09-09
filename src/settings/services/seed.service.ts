import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingValue } from '../model/config.model';
import { Repository } from 'typeorm';
import { ApplicationFeature } from '../model/feature.model';

@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(SettingValue)
        private readonly settingRepository: Repository<SettingValue>,
        @InjectRepository(ApplicationFeature)
        private readonly featureepository: Repository<ApplicationFeature>,
    ) { }

    public async seed() {
        this.insertSettings('org_name', "organization", "Nazwa organizacji", "string", "", "Nazwa organizacji");
        this.insertSettings('org_nip', "organization", "NIP", "string", "", "NIP organizacji");
        this.insertSettings('org_regon', "organization", "REGON", "string", "", "REGON organizacji");
        this.insertSettings('org_krs', "organization", "KRS", "string", "", "KRS organizacji");

        this.insertSettings('mng_days_to_appeal', "management", "Dni na odwołanie", "number", "14", "Dni na odwołanie");
        this.insertSettings('mng_rcomendations', "management", "Dni na płatność", "number", "2", "Liczba wymaganych rekomendacji");
        this.insertSettings('mng_card_prefix', "management", "Prefiks karty", "string", "PLUG", "Prefiks karty");
        this.insertSettings('mng_suspensions_enabled', "management", "Włączone zawieszanie", "boolean", "FALSE", "Włączone zaiweszanie członków");
        this.insertSettings('mng_board_email', "management", "Email zarządu", "string", "boar@plug.org.pl", "Email zarządu");

        this.insertFeature('events_management', "Zarządzanie wydarzeniami", 'Włącza/wyłącza moduł zarządzania wydarzeniami');
        this.insertFeature('members_zone', "Zarządzanie członkami", "Włącza/wyłącza moduł Strefy członka");
        this.insertFeature('dark_mode', "Dark mode", "Włącza/wyłączadark theme");
    }

    private async insertSettings(key: string, group: string, name: string, type: "string" | "number" | "boolean", value?: string, description?: string) {
        if (! await this.settingExists(key)) {
            await this.settingRepository.insert({ key, group, name, valueType: type, value, description });
        }
    }
    private async settingExists(key: string): Promise<boolean> {
        return await this.settingRepository.exists({ where: { key } });
    }

    private async insertFeature(key: string, name: string, description?: string) {
        if (! await this.featureExists(key)) {
            await this.featureepository.insert({ key, name, description });
        }
    }

    private async featureExists(key: string): Promise<boolean> {
        return await this.featureepository.exists({ where: { key } });
    }
}
