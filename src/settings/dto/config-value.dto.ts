import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ConfigValue {
    @ApiProperty()
    key: string;
    @ApiProperty()
    group: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    value: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiProperty()
    valueType: "string" | "number" | "boolean";
}