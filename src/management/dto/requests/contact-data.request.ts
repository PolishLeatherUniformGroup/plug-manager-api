import { ApiPropertyOptional } from "@nestjs/swagger";
import { Address } from "../address.dto";

export class ContactData {
    @ApiPropertyOptional()
    public email?: string;
    @ApiPropertyOptional()
    public phone?: string;
    @ApiPropertyOptional()
    public address?: Address;
}