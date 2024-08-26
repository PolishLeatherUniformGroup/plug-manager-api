import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberSuspensionApealed } from "../../impl/member/member-suspension-apealed.event";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpulsionApealed } from "../../impl/member/member-expulsion-appealed.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(MemberExpulsionApealed)
export class MemberSuspensionApealedHandler
  implements IViewUpdater<MemberSuspensionApealed> {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(event: MemberSuspensionApealed): Promise<void> {
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
