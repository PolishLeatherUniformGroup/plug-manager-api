import { OmitType } from "@nestjs/swagger";
import { Suspension } from "./suspension.request";

export class Expulsion  extends OmitType(Suspension, ["endDate"]){}