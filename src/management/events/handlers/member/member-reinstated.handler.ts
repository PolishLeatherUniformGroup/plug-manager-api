import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberResinstated } from "../../impl/member/member-reinstated.events";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(MemberResinstated)
export class MemberResinstatedHandler
  implements IViewUpdater<MemberResinstated> {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(event: MemberResinstated): Promise<void> {
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
