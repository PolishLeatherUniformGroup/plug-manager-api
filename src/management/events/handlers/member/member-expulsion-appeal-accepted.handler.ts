import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpulsionApealAccepted } from "../../impl/member/member-expulsion-appeal-accepted.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberExpulsionApealAccepted)
export class MemberExpulsionApealAcceptedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope<MemberExpulsionApealAccepted>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "expulsions"],
    });

    var expulsion = member.expulsions.find(
      (expulsion) => expulsion.finished === false,
    );
    expulsion.appealAcceptDate = event.appealAcceptedDate;
    expulsion.finished = true;
    member.status = MemberStatus.Active;

    await this.repository.save(member);
  }
}
