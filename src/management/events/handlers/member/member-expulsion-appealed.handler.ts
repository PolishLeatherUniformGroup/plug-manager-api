import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpulsionApealed } from "../../impl/member/member-expulsion-appealed.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberExpulsionApealed)
export class MemberExpulsionApealedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberExpulsionApealed>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "expulsions"],
    });

    var expulsion = member.expulsions.find(
      (expulsion) => expulsion.finished === false,
    );
    expulsion.appealDate = event.appeal;
    expulsion.appealJustification = event.justification;
    member.status = MemberStatus.ExpulsionAppealed;

    await this.repository.save(member);
  }
}
