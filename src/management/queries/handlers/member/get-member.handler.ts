import { IQueryHandler, QueryHandler } from '@ocoda/event-sourcing';
import { GetMember } from '../../impl/member/get-member.query';
import { Member } from '../../../model/members/member.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@QueryHandler(GetMember)
export class GetMemberHandler implements IQueryHandler<GetMember,Member|null> {
    private readonly logger = new Logger(GetMemberHandler.name);
    constructor(
        @InjectRepository(Member) private readonly repository: Repository<Member>
    ) { }
    async execute(query: GetMember): Promise<Member | null> {
        this.logger.log(`GetMember query received ${query.idOrCard}`);
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