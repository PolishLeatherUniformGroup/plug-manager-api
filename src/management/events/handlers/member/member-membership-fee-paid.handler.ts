import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MemberMembershipFeePaid } from "../../impl/member/member-membership-fee-paid.event";

@ViewUpdaterHandler(MemberMembershipFeePaid)
export class MemberMembershipFeePaidHandler implements IViewUpdater<MemberMembershipFeePaid> {
    constructor(private readonly repository: Repository<Member>
    ) { }

    public async handle(event: MemberMembershipFeePaid): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees"]
            });

        var fee = member.membershipFees.find(fee => fee.year === event.year);
        fee.paidAmount = event.amount;
        fee.paidDate = event.date;

        await this.repository.save(member);
    }
}