import { EventEnvelope, EventHandler, IEventHandler } from '@ocoda/event-sourcing';
import { Member } from '../../../dto/responses/member';
import { MemberActivated } from '../../impl/member/member-activates.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberStatus } from '../../../domain/member/member-status.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MemberActivatedEvent } from '../../../integration/events/member-activated.event';

@EventHandler(MemberActivated)
export class MemberActivatedHandler implements IEventHandler {
    constructor(
        @InjectRepository(Member)
        private readonly repository: Repository<Member>,
        private eventEmitter: EventEmitter2
    ) { }

    async handle(envelope: EventEnvelope<MemberActivated>): Promise<void> {
        const event = envelope.payload;
        const member = await this.repository.findOne({ where: { id: event.id } });

        member.status = MemberStatus.Active;

        const integrationEvent = new MemberActivatedEvent();
        integrationEvent.card = member.cardNumber;
        integrationEvent.email = member.email;
        integrationEvent.firstName = member.firstName;
        integrationEvent.lastName = member.lastName;
        integrationEvent.phone = member.phoneNumber;

        await this.repository.save(member);
        this.eventEmitter.emit('member.activated', integrationEvent);
    }

}