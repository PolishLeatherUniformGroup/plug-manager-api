import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MapperService } from "../../../services/maper.service";
import { MemberContactDataUpdated } from '../../impl/member/member-contact-data-updated.event';

@ViewUpdaterHandler(MemberContactDataUpdated)
export class MemberContactDataUpdatedHandler implements IViewUpdater<MemberContactDataUpdated> {
    constructor(private readonly repository: Repository<Member>,
        private readonly mapperService: MapperService
    ) { }

    public async handle(event: MemberContactDataUpdated): Promise<void> {
        const member = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["membershipFees"]
            });

        member.email = event.email;
        member.phoneNumber = event.phoneNumber;
        member.address = this.mapperService.mapToViewObject(event.address);

        await this.repository.save(member);
    }
}