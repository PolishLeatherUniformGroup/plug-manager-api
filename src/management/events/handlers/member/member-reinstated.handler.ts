import { IEventHandler, EventHandler, EventEnvelope, CommandBus } from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberResinstated } from "../../impl/member/member-reinstated.events";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberRequestFeePayment } from "../../../commands/impl/member/member-request-fee-payment.command";
import { SettingsService } from "../../../services/settings.service";
import { get } from "http";

@EventHandler(MemberResinstated)
export class MemberResinstatedHandler
  implements IEventHandler {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
    private readonly commandBus: CommandBus,
    private readonly settingsService:SettingsService,
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
    const thisYear = new Date().getFullYear();
    const dueDate = new Date();
    if (member.membershipFees.find((fee) => fee.year === thisYear) === undefined) {
      var fee = await this.settingsService.getYearlyFee(thisYear);
      var command = new MemberRequestFeePayment(event.id, thisYear, fee, this.getDueDate());
    }
  }

  private getDueDate(): Date {
    let result = new Date();
    result.setDate(result.getDate() + 14);
    return result;
  }
}
