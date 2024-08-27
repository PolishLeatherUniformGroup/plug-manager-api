import { OmitType } from "@nestjs/swagger";
import { Applicant } from "./applicant.response";

export class ApplicantRecommendation extends OmitType(Applicant, ["email","phoneNumber","birthDate","address", "fee","recommendations"]) {

}