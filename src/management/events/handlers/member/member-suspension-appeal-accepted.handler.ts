import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberSuspensionApealAccepted } from "../../impl/member/member-suspension-appeal-accepted.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberSuspensionApealAccepted)
export class MemberSuspensionApealAcceptedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberSuspensionApealAccepted>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "suspensions"],
    });

    var suspension = member.suspensions.find(
      (suspension) => suspension.finished === false,
    );
    suspension.appealAcceptDate = event.appealAcceptedDate;
    suspension.finished = true;
    member.status = MemberStatus.Active;

    await this.repository.save(member);
  }
}
