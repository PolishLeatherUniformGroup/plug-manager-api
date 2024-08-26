import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberSuspended } from "../../impl/member/member-suspended.event";
import { Suspension } from "../../../model/members/suspension.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";

@ViewUpdaterHandler(MemberSuspended)
export class MemberSuspendedHandler implements IViewUpdater<MemberSuspended> {
    constructor(private readonly repository: Repository<Member>
    ) { }

    public async handle(event: MemberSuspended): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees", "suspensions"]
            });

        var suspension = new Suspension();
        suspension.startDate = event.suspendedDate;
        suspension.justification = event.reason;
        suspension.endDate = event.suspendedUntil;
        suspension.appealDeadline = event.appealDeadline;
        member.suspensions.push(suspension);
        member.status = MemberStatus.Suspended;

        await this.repository.save(member);
    }
}