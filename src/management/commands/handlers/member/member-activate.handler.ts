import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ActivateMemberCommand } from "../../impl/member/member-activate.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberId } from "../../../domain/member/member-id";
import { Logger } from "@nestjs/common";

@CommandHandler(ActivateMemberCommand)
export class ActivateMemberCommandHandler implements ICommandHandler<ActivateMemberCommand> {
    private readonly logger = new Logger(ActivateMemberCommandHandler.name);
    public constructor(
        private readonly memberRepository: MemberAggregateRepository,
    ) {
    }
    async execute(command: ActivateMemberCommand): Promise<any> {
        this.logger.log(`Activating member ${command.id}`);
        const member = await this.memberRepository.getById(MemberId.from(command.id));
        member.activate();
        await this.memberRepository.save(member);
    }


}