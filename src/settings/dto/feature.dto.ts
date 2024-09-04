import { ApiProperty } from "@nestjs/swagger";

export class Feature {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    enabled: boolean;
}