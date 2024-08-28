import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberSuspensionApealed } from "../../impl/member/member-suspension-apealed.event";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberSuspensionApealed)
export class MemberSuspensionApealedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberSuspensionApealed>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "suspensions"],
    });

    var suspension = member.suspensions.find(
      (suspension) => suspension.finished === false,
    );
    suspension.appealDate = event.appeal;
    suspension.appealJustification = event.justification;
    member.status = MemberStatus.SuspensionAppealed;

    await this.repository.save(member);
  }
}
