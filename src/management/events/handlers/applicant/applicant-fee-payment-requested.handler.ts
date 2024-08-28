import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaymentRequested } from "../../impl/applicant/applicant-fee-payment-requested.event";
import { InjectRepository } from "@nestjs/typeorm";

@EventHandler(ApplicantFeePaymentRequested)
export class ApplicantFeePaymentRequestedHandler
  implements IEventHandler
{
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) {}

  async handle(envelope: EventEnvelope<ApplicantFeePaymentRequested>): Promise<void> {
    const event = envelope.payload;
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations"],
    });
    applicant.applicationFee.dueAmount = event.amount;

    await this.repository.save(applicant);
  }
}
