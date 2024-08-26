import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MemberAggregateRepository } from "../../../domain/member/member.aggregate-repository";
import { MemberUpdateContactData } from "../../impl/member/member-update-contact-data.command";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { MapperService } from "../../../services/maper.service";

@CommandHandler(MemberUpdateContactData)
export class MemberUpdateContactDataHandler implements ICommandHandler<MemberUpdateContactData> {
    constructor(
        private readonly memberRepository: MemberAggregateRepository,
        private readonly eventPublisher: StoreEventPublisher,
        private readonly mapperService: MapperService
    ) { }

    async execute(command: MemberUpdateContactData) {
        try {
            var member = this.eventPublisher.mergeObjectContext(await this.memberRepository.getById(command.id));
            member.updateContactData(command.email, command.phone, this.mapperService.mapToDomainObject(command.address));
            member.commit();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }
}