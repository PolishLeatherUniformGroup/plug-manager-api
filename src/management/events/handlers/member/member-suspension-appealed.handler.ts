import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberSuspensionApealed } from "../../impl/member/member-suspension-apealed.event";
import { MemberStatus } from "../../../domain/member/member-status.enum";

@ViewUpdaterHandler(MemberSuspensionApealed)
export class MemberSuspensionApealedHandler implements IViewUpdater<MemberSuspensionApealed> {
    constructor(private readonly repository: Repository<Member>
    ) { }

    public async handle(event: MemberSuspensionApealed): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees", "suspensions"]
            });

        var suspension = member.suspensions.find(suspension => suspension.finished === false);
        suspension.appealDate = event.appeal;
        suspension.appealJustification = event.justification;
        member.status = MemberStatus.SuspensionAppealed;

        await this.repository.save(member);
    }
}