import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMember } from '../../impl/member/get-member.query';
import { Member } from '../../../model/members/member.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetMember)
export class GetMemberHandler implements IQueryHandler<GetMember> {
    constructor(
        @InjectRepository(Member) private readonly repository: Repository<Member>
    ) { }
    async execute(query: GetMember): Promise<Member | null> {
        if (query.idOrCard.match(/^PLUG-[0-9]+$/)) {
            return await this.repository.findOneBy({
                cardNumber: query.idOrCard
            });
        } else {
            return await this.repository.findOneBy({
                id: query.idOrCard
            });
        }
    }
}