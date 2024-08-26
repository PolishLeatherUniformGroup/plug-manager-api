import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberMembershipTerminated } from "../../impl/member/member-membership-terminated.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(MemberMembershipTerminated)
export class MemberMembershipTerminatedHandler
  implements IViewUpdater<MemberMembershipTerminated> {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(event: MemberMembershipTerminated): Promise<void> {
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees"],
    });

    member.terminationDate = event.terminationDate;
    member.status = MemberStatus.Terminated;

    await this.repository.save(member);
  }
}
