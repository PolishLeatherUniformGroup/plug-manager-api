import { MemberCreated } from "../../impl/member/member-created.event";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MembershipFee } from "../../../model/members/membership-fee.model";
import { MapperService } from "../../../services/maper.service";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { EventHandler, IEventHandler, EventEnvelope } from "@ocoda/event-sourcing";
import { MemberImport } from "../../../commands/impl/member/member-import.command";
import { MemberImported } from "../../impl/member/member-imported.event";

@EventHandler(MemberImported)
export class MemberImportedHandler implements IEventHandler {
    constructor(
        @InjectRepository(Member)
        private readonly repository: Repository<Member>,
        private readonly mapperService: MapperService,
    ) { }

    public async handle(envelope: EventEnvelope<MemberImported>): Promise<void> {
        const event = envelope.payload;
        const member = new Member();
        member.id = event.id;
        member.cardNumber = event.cardNumber;
        member.firstName = event.firstName;
        member.lastName = event.lastName;
        member.email = event.email;
        member.phoneNumber = event.phoneNumber;
        member.joinDate = event.joinDate;
        member.status = MemberStatus.Active;
        member.birthDate = event.birthDate;
        var fee = new MembershipFee();
        fee.year = new Date().getFullYear();
        fee.dueAmount = event.paid;
        fee.paidAmount = event.paid;
        fee.dueDate = new Date(new Date().getFullYear(), 2, 31);
        fee.paidDate = new Date(new Date().getFullYear(), 0, 31);
        fee.member = member;
        member.membershipFees = [fee];

        await this.repository.save(member);
    }
}
