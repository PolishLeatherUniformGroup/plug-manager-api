import { ApiProperty } from "@nestjs/swagger";

export class Publish {
    @ApiProperty()
    id: number;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    publishedBy: string;

    @ApiProperty()
    publishedAt: Date;
}