import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Identifier } from "../model/settings/identifiers";
import { Fee } from "../model/settings/fee";

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Identifier) private readonly repository: Repository<Identifier>,
        @InjectRepository(Fee) private readonly feeRepository: Repository<Fee>
    ) { }

    public async getYearlyFee(year: number): Promise<number> {
        const { baseAmount } = await this.feeRepository.findOne({
            where: {
                year: year
            }
        });
        return baseAmount;
    }

    public async getNextMemberCard(): Promise<string> {
        const identifier = await this.repository.findOne({
            where: {
                name: "member"
            }
        });
        const next = identifier.last + 1;
        identifier.last = next;
        await this.repository.save(identifier);
        return `PLUG-${next.toString().padStart(4, "0")}`;
    }

    public async addFee(year: number, amount: number, date: Date): Promise<void> {
        const fee = new Fee();
        fee.year = year;
        fee.baseAmount = amount;
        fee.baseDue = date;
        await this.feeRepository.save(fee);
    }
}