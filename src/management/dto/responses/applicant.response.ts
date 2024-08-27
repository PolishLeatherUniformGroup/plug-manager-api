import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Address } from "../address.dto";
import { Recommendation } from "./recommendation.response";
import { RequiredFee } from "./required-fee.response";

export class Applicant {

    @ApiProperty()
    public id: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public address: Address;

    @ApiProperty()
    public birthDate: Date;

    @ApiProperty()
    public applyDate: Date;

    @ApiPropertyOptional()
    public phoneNumber?: string;

    @ApiProperty({ type: [Recommendation] })
    public recommendations: Recommendation[];

    @ApiProperty()
    public fee:RequiredFee;
}