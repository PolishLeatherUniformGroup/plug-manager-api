import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { MemberCreate } from "../../impl/member/member-create.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { v4 as uuidv4 } from "uuid";

import { MapperService } from "../../../services/maper.service";
import { Member } from "../../../domain/member/member.aggregate";
import { MemberService } from "../../../services/member.service";
import { MemberId } from "../../../domain/member/member-id";

@CommandHandler(MemberCreate)
export class MemberCreateHandler implements ICommandHandler {
  constructor(
    private readonly memberRepository: MemberAggregateRepository,   
    private readonly mapperService: MapperService,
    private readonly membersService: MemberService,
  ) {}
  async execute(command: MemberCreate): Promise<any> {
    try {
      const id = MemberId.generate();
      const {
        firstName,
        lastName,
        email,
        applyDate,
        birthDate,
        address,
        joinDate,
        phone,
        paid,
      } = command;
      var card = await this.membersService.nextCard();
      const applicant =  Member.create(
          id,
          card,
          firstName,
          lastName,
          email,
          this.mapperService.mapToDomainObject(address),
          applyDate,
          birthDate,
          joinDate,
          paid,
          phone,
        );

      await this.memberRepository.save(applicant);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
