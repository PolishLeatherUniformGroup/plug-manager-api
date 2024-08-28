import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberMembershipTerminated } from "../../impl/member/member-membership-terminated.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberMembershipTerminated)
export class MemberMembershipTerminatedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberMembershipTerminated>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees"],
    });

    member.terminationDate = event.terminationDate;
    member.status = MemberStatus.Terminated;

    await this.repository.save(member);
  }
}
