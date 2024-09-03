import { OmitType } from "@nestjs/swagger";
import { Section } from "../model/section.model";

export class CreateSection extends OmitType(Section, ['id']) {

}