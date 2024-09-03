import { OmitType } from "@nestjs/swagger";
import { Section } from "./section.dto";

export class CreateSection extends OmitType(Section, ['id']) {

}