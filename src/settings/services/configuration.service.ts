import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from '../model/config.model';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigurationService {
    private installedKey: string = 'app_installed';
    constructor(@InjectRepository(Config) private readonly repository: Repository<Config>) { }

    async isInstalled(): Promise<boolean> {
        var val = await this.repository.findOne({ where: { key: this.installedKey } });
        if (val === undefined) {
            return false;
        }
        if (val.value === undefined) {
            return false;
        }
        return this.toValue(val.value, val.valueType) as boolean;
    }

    async get(): Promise<Config[]> {
        return this.repository.find();
    }

    async updateValue(key: string, value?: string) {
        let config = await this.repository.findOne({ where: { key: key } });
        if (config === undefined) {
            return;
        }
        // maybe add verification of content
        config.value = value;

        await this.repository.save(config);
    }

    async getValue(key: string): Promise<string | null> {
        let config = await this.repository.findOne({ where: { key: key } });
        if (config === undefined) {
            return null;
        }
        return config.value;
    }

    private toValue(value: string, type: "string" | "number" | "boolean"): boolean | string | number {
        switch (type) {
            case "string":
                return value;
            case "number":
                return parseInt(value);
            case "boolean":
                return value.toLowerCase() === 'true';
        }
    }
}
