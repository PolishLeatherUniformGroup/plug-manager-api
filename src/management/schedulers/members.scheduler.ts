import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Repository } from "typeorm";
import { Member } from "../model/members/member.model";
import { CommandBus } from "@nestjs/cqrs";
import { MemberStatus } from "../domain/member/member-status.enum";
import { MemberReinstate } from "../commands/impl/member/member-reinstate.command";
import { MemberTerminateMembership } from "../commands/impl/member/member-terminate-membership.command";

@Injectable()
export class MembersScheduler {
  constructor(
    private readonly repsoitory: Repository<Member>,
    private readonly commandBus: CommandBus,
  ) {}

  @Cron("0 2 * * *")
  async endSuspensions() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var suspended = await this.repsoitory.find({
      where: {
        status: MemberStatus.Suspended,
      },
      relations: ["suspensions"],
    });
    var toActivate = suspended.filter(
      (m) => m.currentSuspension().endDate <= yesterday,
    );
    if (toActivate.length === 0) {
      return;
    }
    toActivate.forEach(async (m) => {
      var command = new MemberReinstate(m.id);
      await this.commandBus.execute(command);
    });
  }

  @Cron("0 2 * * *")
  async trminayeNotAppealedExpulsions() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var suspended = await this.repsoitory.find({
      where: {
        status: MemberStatus.Expelled,
      },
      relations: ["expulsions"],
    });
    var toTerminate = suspended.filter(
      (m) => m.currentExpulsion().appealDeadline <= yesterday,
    );
    if (toTerminate.length === 0) {
      return;
    }
    toTerminate.forEach(async (m) => {
      var command = new MemberTerminateMembership(m.id, new Date());
      await this.commandBus.execute(command);
    });
  }
}
