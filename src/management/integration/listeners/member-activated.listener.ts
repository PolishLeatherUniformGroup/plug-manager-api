import { Injectable, Logger } from '@nestjs/common';
import { MemberActivatedEvent } from '../events/member-activated.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Auth0Service } from '../../services/auth0.service';

@Injectable()
export class MemberActivatedListener {
    private readonly logger = new Logger(MemberActivatedListener.name);
    constructor(private readonly authApi: Auth0Service) { }

    @OnEvent('member.activated')
    handleOrderCreatedEvent(event: MemberActivatedEvent) {
        this.logger.log(`Member activated: ${event}`);
        this.authApi.createAccount(event);
        
        console.log(event);
    }
}