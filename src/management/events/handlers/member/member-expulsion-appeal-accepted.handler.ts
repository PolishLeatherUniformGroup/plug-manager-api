import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpulsionApealAccepted } from '../../impl/member/member-expulsion-appeal-accepted.event';

@ViewUpdaterHandler(MemberExpulsionApealAccepted)
export class MemberExpulsionApealAcceptedHandler implements IViewUpdater<MemberExpulsionApealAccepted> {
    constructor(private readonly repository: Repository<Member>
    ) { }

    public async handle(event: MemberExpulsionApealAccepted): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees", "expulsions"]
            });

        var expulsion = member.expulsions.find(expulsion => expulsion.finished === false);
        expulsion.appealAcceptDate = event.appealAcceptedDate;
        expulsion.finished = true;
        member.status = MemberStatus.Active;

        await this.repository.save(member);
    }
}