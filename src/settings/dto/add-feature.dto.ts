import { OmitType } from "@nestjs/swagger";
import { Feature } from "./feature.dto";

export class AddFeature extends OmitType(Feature, ["enabled"]) { }