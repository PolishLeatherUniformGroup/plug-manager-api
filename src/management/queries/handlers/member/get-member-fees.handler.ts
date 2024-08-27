import { IQueryHandler } from "@nestjs/cqrs";
import { GetMemberFees } from "../../impl/member/get-member-fees.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "../../../model/members/member.model";
import { Repository } from "typeorm";
import { MembershipFee } from "../../../model/members/membership-fee.model";

export class GetMemberFeesHandler implements IQueryHandler<GetMemberFees>{
    constructor(@InjectRepository(Member) private readonly repository:Repository<Member>){}

    async execute(query: GetMemberFees): Promise<MembershipFee[]> {
        let member = query.idOrCard.match(/PLUG-\d{4}/) ?
        await this.repository.findOneBy({
            cardNumber: query.idOrCard
        })
        : await this.repository.findOneBy({
            id: query.idOrCard
        });
        return member.membershipFees.sort((a, b) => a.year - b.year);
    }
}