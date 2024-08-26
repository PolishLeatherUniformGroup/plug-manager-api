import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberStatus } from "../../../domain/member/member-status.enum";
import { MemberSuspensionApealRejected } from '../../impl/member/member-suspension-appeal-rejected.event';

@ViewUpdaterHandler(MemberSuspensionApealRejected)
export class MemberSuspensionApealRejectedHandler implements IViewUpdater<MemberSuspensionApealRejected> {
    constructor(private readonly repository: Repository<Member>
    ) { }

    public async handle(event: MemberSuspensionApealRejected): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees", "suspensions"]
            });

        var suspension = member.suspensions.find(suspension => suspension.finished === false);
        suspension.appealRejectDate = event.appealRejectedDate;
        suspension.appealRejectionJustification = event.justification;

        member.status = MemberStatus.Active;

        await this.repository.save(member);
    }
}