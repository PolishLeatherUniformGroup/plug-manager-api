import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpulsionApealRejected } from "../../impl/member/member-expulsion-appeal-rejected.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(MemberExpulsionApealRejected)
export class MemberExpulsionApealRejectedHandler
  implements IViewUpdater<MemberExpulsionApealRejected> {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) { }

  public async handle(event: MemberExpulsionApealRejected): Promise<void> {
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees", "expulsions"],
    });

    var expulsion = member.expulsions.find(
      (expulsion) => expulsion.finished === false,
    );
    expulsion.appealRejectDate = event.appealRejectedDate;
    expulsion.appealRejectionJustification = event.justification;
    expulsion.finished = true;
    member.status = MemberStatus.Terminated;
    member.terminationDate = event.appealRejectedDate;

    await this.repository.save(member);
  }
}
