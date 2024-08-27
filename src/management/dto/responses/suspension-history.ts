import { ApiPropertyOptional } from "@nestjs/swagger";
import { Suspension } from "../requests/suspension.request";

export class SuspensionHistory  extends Suspension{
    @ApiPropertyOptional()
    public appealDate?: Date;
    @ApiPropertyOptional()
    public appealJustification?: string;
    @ApiPropertyOptional()
    public appealDecisionDate?: Date;
    @ApiPropertyOptional()
    public appealDecisionJustification?: string;
    @ApiPropertyOptional()
    public appealDecision?: boolean;
}