import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Address } from "../address.dto";

export class ImportedMember {
    @ApiProperty()
    public cardNumber: string;
    @ApiProperty()
    public firstName: string;
    @ApiProperty()
    public lastName: string;
    @ApiProperty()
    public email: string;
    @ApiPropertyOptional()
    public birthDate?: Date;
    @ApiProperty()
    public joinDate: Date;
    @ApiPropertyOptional()
    public phone?: string;
    @ApiPropertyOptional()
    public address?: Address;
}

export class Import {
    @ApiProperty({ type: [ImportedMember] })
    public members: ImportedMember[];
}