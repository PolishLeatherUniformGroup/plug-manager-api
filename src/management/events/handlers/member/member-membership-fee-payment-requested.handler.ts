import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Member } from "../../../model/members/member.model";
import { MapperService } from "../../../services/maper.service";
import { MemberMembershipFeePaymentRequested } from "../../impl/member/member-membership-fee-payment-requested.event";
import { MembershipFee } from "../../../model/members/membership-fee.model";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(MemberMembershipFeePaymentRequested)
export class MemberMembershipFeePaymentRequestedHandler
  implements IViewUpdater<MemberMembershipFeePaymentRequested> {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
    private readonly mapperService: MapperService,
  ) { }

  public async handle(
    event: MemberMembershipFeePaymentRequested,
  ): Promise<void> {
    const member = await this.repository.findOne({
      where: { id: event.id },
      relations: ["membershipFees"],
    });

    var fee = new MembershipFee();
    fee.year = event.year;
    fee.dueAmount = event.amount;
    fee.dueDate = event.dueDate;
    fee.member = member;
    member.membershipFees.push(fee);

    await this.repository.save(member);
  }
}
