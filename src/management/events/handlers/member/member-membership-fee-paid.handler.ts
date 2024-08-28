import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberMembershipFeePaid } from "../../impl/member/member-membership-fee-paid.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberMembershipFeePaid)
export class MemberMembershipFeePaidHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope< MemberMembershipFeePaid>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees"],
    });

    var fee = member.membershipFees.find((fee) => fee.year === event.year);
    fee.paidAmount = event.amount;
    fee.paidDate = event.date;

    await this.repository.save(member);
  }
}
