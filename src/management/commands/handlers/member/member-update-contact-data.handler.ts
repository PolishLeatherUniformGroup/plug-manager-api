import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberUpdateContactData } from "../../impl/member/member-update-contact-data.command";

import { MapperService } from "../../../services/maper.service";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberUpdateContactData)
export class MemberUpdateContactDataHandler
  implements ICommandHandler
{
  constructor(
    private readonly memberRepository: MemberAggregateRepository,
    private readonly mapperService: MapperService,
  ) {}

  async execute(command: MemberUpdateContactData) {
    try {
      const member = await this.memberRepository.getById(MemberId.from(command.id));
      member.updateContactData(
        command.email,
        command.phone,
        this.mapperService.mapToDomainObject(command.address),
      );
      await this.memberRepository.save(member);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
