import { StorableEvent } from 'event-sourcing-nestjs';
import { Member } from '../../../domain/member/member.aggregate';
export class MemberExpulsionApealRejected extends StorableEvent {
    eventAggregate = Member.AGGREGATE_NAME;
    eventVersion = 1;
    constructor(public readonly id: string) {
        super();
    }
}