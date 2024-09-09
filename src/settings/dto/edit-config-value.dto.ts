import { OmitType } from "@nestjs/swagger";
import { ConfigValue } from "./config-value.dto";

export class EditConfigValue extends OmitType(ConfigValue, ['description', 'key', 'valueType', 'group', 'name']) { }