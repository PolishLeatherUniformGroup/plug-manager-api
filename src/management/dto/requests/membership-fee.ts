import { OmitType } from '@nestjs/swagger';
import { OverrideFee } from './overrride-fee';
export class MembershipFee extends OmitType(OverrideFee, ['dueAmount', 'dueDate']) {
}
