import { ICommandHandler } from "@nestjs/cqrs";
import { MemberCreate } from "../../impl/member/member-create.command";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { v4 as uuidv4 } from 'uuid';
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";
import { MapperService } from "../../../services/maper.service";
import { Member } from "../../../domain/member/member.aggregate";
import { MembersRepository } from "../../../repository/members.repository";

export class MemberCreateHandler implements ICommandHandler<MemberCreate> {
    constructor(private readonly membersRepository: MemberAggregateRepository,
        private readonly publisher: StoreEventPublisher,
        private readonly mapperService: MapperService,
        private readonly repository: MembersRepository
    ) { }
    async execute(command: MemberCreate): Promise<any> {
        try {
            const id = uuidv4();
            const { firstName, lastName, email, applyDate, birthDate, address, joinDate, phone, paid } =
                command;
            var card = await this.repository.nextCard();
            const applicant = this.publisher.mergeObjectContext(
                Member.create(
                    id,
                    card,
                    firstName,
                    lastName,
                    email,
                    this.mapperService.mapToDomainObject(address),
                    applyDate,
                    birthDate,
                    joinDate,
                    paid,
                    phone
                ),
            );

            applicant.commit();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}