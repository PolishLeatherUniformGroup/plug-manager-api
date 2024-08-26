import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberExpelled } from '../../impl/member/member-expelled.event';
import { Expulsion } from "../../../model/members/expulsion.model";

@ViewUpdaterHandler(MemberExpelled)
export class MemberExpelledHandler implements IViewUpdater<MemberExpelled> {
    constructor(private readonly repository: Repository<Member>
    ) { }

    public async handle(event: MemberExpelled): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees", "expulsions"]
            });

        var expulsion = new Expulsion();
        expulsion.startDate = event.expelledDate;
        expulsion.justification = event.reason;
        expulsion.appealDeadline = event.appealDeadline;
        member.expulsions.push(expulsion);
        member.status = MemberStatus.Expelled;

        await this.repository.save(member);
    }
}