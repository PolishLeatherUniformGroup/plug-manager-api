import { ApiProperty } from "@nestjs/swagger";

export class Feature {
    @ApiProperty()
    key: string

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: 'boolean' })
    enabled: boolean;
}