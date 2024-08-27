import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expulsion } from "../requests/expulsion.request";

export class ExpulsionHistory  extends Expulsion{
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