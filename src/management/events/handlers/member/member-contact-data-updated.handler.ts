import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MapperService } from "../../../services/maper.service";
import { MemberContactDataUpdated } from "../../impl/member/member-contact-data-updated.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(MemberContactDataUpdated)
export class MemberContactDataUpdatedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
    private readonly mapperService: MapperService,
  ) { }

  public async handle(envelope: EventEnvelope<MemberContactDataUpdated>): Promise<void> {
    const event = envelope.payload;
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees"],
    });

    member.email = event.email;
    member.phoneNumber = event.phoneNumber;
    member.address = this.mapperService.mapToViewObject(event.address);

    await this.repository.save(member);
  }
}
