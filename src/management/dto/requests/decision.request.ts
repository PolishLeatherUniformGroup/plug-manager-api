import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";

export class Decision {
    @ApiProperty()
    public accepted: boolean;
    @ApiPropertyOptional()
    public reason?: string;
    @ApiProperty()
    public date: Date;
    @ApiPropertyOptional()
    public appealDeadline?: Date;
}

export class AppealDecision extends OmitType(Decision, ["appealDeadline"]) {
}