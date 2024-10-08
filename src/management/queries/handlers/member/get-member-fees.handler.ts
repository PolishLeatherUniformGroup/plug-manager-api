import { IQueryHandler, QueryHandler } from "@ocoda/event-sourcing";
import { GetMemberFees } from "../../impl/member/get-member-fees.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "../../../model/members/member.model";
import { Repository } from "typeorm";
import { MembershipFee } from "../../../model/members/membership-fee.model";

@QueryHandler(GetMemberFees)
export class GetMemberFeesHandler implements IQueryHandler<GetMemberFees, MembershipFee[]> {
    constructor(@InjectRepository(Member) private readonly repository: Repository<Member>) { }

    async execute(query: GetMemberFees): Promise<MembershipFee[]> {
        let member = query.idOrCard.match(/PLUG-\d{4}/) ?
            await this.repository.findOne({
                where: { cardNumber: query.idOrCard },
                relations: ["membershipFees"]
            })
            : await this.repository.findOne({
                where: { id: query.idOrCard },
                relations: ["membershipFees"]
            });
        return member.membershipFees.sort((a, b) => a.year - b.year);
    }
}