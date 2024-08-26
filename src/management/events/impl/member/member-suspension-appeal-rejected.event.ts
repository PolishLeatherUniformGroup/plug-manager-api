import { StorableEvent } from 'event-sourcing-nestjs';
import { Member } from '../../../domain/member/member.aggregate';
export class MemberSuspensionApealRejected extends StorableEvent {
    eventAggregate = Member.AGGREGATE_NAME;
    eventVersion = 1;
    constructor(public readonly id: string, public readonly appealRejectedDate: Date, public readonly justification: string) {
        super();
    }
}