import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
}

export class Import {
    @ApiProperty({ type: [ImportedMember] })
    public members: ImportedMember[];
}