import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpelled } from "../../impl/member/member-expelled.event";
import { Expulsion } from "../../../model/members/expulsion.model";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberExpelled)
export class MemberExpelledHandler implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(envelope: EventEnvelope< MemberExpelled>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "expulsions"],
    });

    var expulsion = new Expulsion();
    expulsion.startDate = event.expelledDate;
    expulsion.justification = event.reason;
    expulsion.appealDeadline = event.appealDeadline;
    member.expulsions.push(expulsion);
    member.status = MemberStatus.Expelled;

    await this.repository.save(member);
  }
}
