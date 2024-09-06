import { Injectable } from "@nestjs/common";
import { EmailService } from "../email.service";
import { OnEvent } from "@nestjs/event-emitter";
import { MemberActivatedEvent } from "../../management/integration/events/member-activated.event";

@Injectable()
export class MemberActivatedListener {

    constructor(private readonly emailService: EmailService) { }

    @OnEvent('member.activated')
    async handleOrderCreatedEvent(event: MemberActivatedEvent) {
        await this.emailService.sendMembershipStartEmail(event.email, event.firstName);
    }
}