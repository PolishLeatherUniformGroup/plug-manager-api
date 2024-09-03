import { OmitType } from "@nestjs/swagger";
import { Section } from "./section.dto";

export class SectionResult extends OmitType(Section, ["metadata"]) {
    children: SectionResult[];
}