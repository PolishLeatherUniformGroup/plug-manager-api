import { IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "../../../model/members/member.model";
import { Repository } from "typeorm";
import { GetMemberSuspensions } from "../../impl/member/get-member-suspensions.query";
import { Suspension } from "../../../model/members/suspension.model";

export class GetMemberSuspensionsHandler implements IQueryHandler<GetMemberSuspensions>{
    constructor(@InjectRepository(Member) private readonly repository:Repository<Member>){}
    async execute(query: GetMemberSuspensions): Promise<Suspension[]> {
        let member = query.idOrCard.match(/PLUG-\d{4}/) ?
        await this.repository.findOneBy({
            cardNumber: query.idOrCard
        })
        : await this.repository.findOneBy({
            id: query.idOrCard
        });
        return member.suspensions;
    }
}