import { ApiProperty } from "@nestjs/swagger";

export class Recommendation{

    @ApiProperty()
    public id: string;

    @ApiProperty()
    public recommender: string;

    @ApiProperty()
    public accepted?: boolean;
}