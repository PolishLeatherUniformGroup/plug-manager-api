import { ApiProperty } from "@nestjs/swagger";

export class RecommendationDecision {
    @ApiProperty()
    public accepted: boolean;
}