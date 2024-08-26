import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberSuspensionApealAccepted } from "../../impl/member/member-suspension-appeal-accepted.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(MemberSuspensionApealAccepted)
export class MemberSuspensionApealAcceptedHandler
  implements IViewUpdater<MemberSuspensionApealAccepted> {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(event: MemberSuspensionApealAccepted): Promise<void> {
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
