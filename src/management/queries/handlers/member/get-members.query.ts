import { IQueryHandler, QueryHandler } from '@ocoda/event-sourcing';
import { GetMembers } from '../../impl/member/get-members.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../../model/members/member.model';
import { Repository } from 'typeorm';

@QueryHandler(GetMembers)
export class GetMembersHandler implements IQueryHandler<GetMembers, Member[]> {
    constructor(@InjectRepository(Member) private readonly repository:Repository<Member>) { }

    async execute(query:GetMembers): Promise<Member[]> {
        if(!query.status) {
            return await this.repository.find();
        }
        return await this.repository.findBy({
            status: query.status
        });
    }
}