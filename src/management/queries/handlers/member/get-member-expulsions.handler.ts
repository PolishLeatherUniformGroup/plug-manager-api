import { IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "../../../model/members/member.model";
import { Repository } from "typeorm";
import { GetMemberExpulsions } from "../../impl/member/get-member-expulsions.query";
import { Expulsion } from "../../../model/members/expulsion.model";

export class GetMemberExpulsionsHandler implements IQueryHandler<GetMemberExpulsions>{
    constructor(@InjectRepository(Member) private readonly repository:Repository<Member>){}
    async execute(query: GetMemberExpulsions): Promise<Expulsion[]> {
        let member = query.idOrCard.match(/PLUG-\d{4}/) ?
        await this.repository.findOneBy({
            cardNumber: query.idOrCard
        })
        : await this.repository.findOneBy({
            id: query.idOrCard
        });
        return member.expulsions;
    }
}