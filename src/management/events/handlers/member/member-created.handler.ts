import { MemberCreated } from "../../impl/member/member-created.event";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MembershipFee } from "../../../model/members/membership-fee.model";
import { MapperService } from "../../../services/maper.service";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { EventHandler, IEventHandler, EventEnvelope } from "@ocoda/event-sourcing";

@EventHandler(MemberCreated)
export class MemberCreatedHandler implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
    private readonly mapperService: MapperService,
  ) { }

  public async handle(envelope: EventEnvelope<MemberCreated>): Promise<void> {
    const event = envelope.payload;
    const member = new Member();
    member.id = event.id;
    member.firstName = event.firstName;
    member.lastName = event.lastName;
    member.email = event.email;
    member.phoneNumber = event.phoneNumber;
    member.joinDate = event.joinDate;
    member.status = MemberStatus.Active;
    member.birthDate = event.birthDate;
    member.address = this.mapperService.mapToViewObject(event.address);

    var fee = new MembershipFee();
    fee.year = event.joinDate.getFullYear();
    fee.dueAmount = event.paid;
    fee.dueDate = event.joinDate;
    fee.member = member;
    member.membershipFees = [fee];

    await this.repository.save(member);
  }
}
