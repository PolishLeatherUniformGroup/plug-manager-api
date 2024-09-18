import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ActivateMemberCommand } from "../../impl/member/member-activate.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberId } from "../../../domain/member/member-id";
import { Logger } from "@nestjs/common";
import { GoogleCardService } from "../../../services/google-card.service";
import { MemberActivated } from "../../../events/impl/member/member-activates.event";
import { MemberActivatedEvent } from "../../../integration/events/member-activated.event";
import { EventEmitter2 } from "@nestjs/event-emitter";

@CommandHandler(ActivateMemberCommand)
export class ActivateMemberCommandHandler implements ICommandHandler<ActivateMemberCommand> {
    private readonly logger = new Logger(ActivateMemberCommandHandler.name);
    public constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly googleCardService: GoogleCardService,
        private readonly eventEmitter: EventEmitter2
    ) {
    }
    async execute(command: ActivateMemberCommand): Promise<any> {
        this.logger.log(`Activating member ${command.id}`);
        const member = await this.memberRepository.getById(MemberId.from(command.id));
        member.activate();
        await this.memberRepository.save(member);
        // Create membership card
        const passClass = await this.googleCardService.createPassClass();
        const googleCard = await this.googleCardService.issueCard(passClass, `${member.firstName} ${member.lastName}`, member.cardNumber);
        // TODO: APPLE Wallet CARD
        const notification: MemberActivatedEvent = {
            card: member.cardNumber,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            phone: member.phoneNumber,
            googleLink: googleCard,
            appleLink: null
        } as MemberActivatedEvent;
        this.eventEmitter.emit(MemberActivated.name, notification);
    }


}