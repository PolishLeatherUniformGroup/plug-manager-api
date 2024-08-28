import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberSuspended } from "../../impl/member/member-suspended.event";
import { Suspension } from "../../../model/members/suspension.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberSuspended)
export class MemberSuspendedHandler implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberSuspended>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "suspensions"],
    });

    var suspension = new Suspension();
    suspension.startDate = event.suspendedDate;
    suspension.justification = event.reason;
    suspension.endDate = event.suspendedUntil;
    suspension.appealDeadline = event.appealDeadline;
    member.suspensions.push(suspension);
    member.status = MemberStatus.Suspended;

    await this.repository.save(member);
  }
}
