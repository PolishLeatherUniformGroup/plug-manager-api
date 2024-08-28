import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberResinstated } from "../../impl/member/member-reinstated.events";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberResinstated)
export class MemberResinstatedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberResinstated>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "suspensions"],
    });

    var suspension = member.suspensions.find(
      (suspension) => suspension.finished === false,
    );
    suspension.finished = true;
    member.status = MemberStatus.Active;

    await this.repository.save(member);
  }
}
