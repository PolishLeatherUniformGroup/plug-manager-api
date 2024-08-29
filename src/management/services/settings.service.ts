import { Injectable } from "@nestjs/common";

@Injectable()
export class SettingsService {
    
    public async getYearlyFee(year:number): Promise<number> {
        return 120;
    }
}