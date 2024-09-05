import { ApiProperty } from "@nestjs/swagger";

export class ConfigValue {
    @ApiProperty()
    key: string;
    @ApiProperty()
    value: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    valueType: "string" | "number" | "boolean";
}