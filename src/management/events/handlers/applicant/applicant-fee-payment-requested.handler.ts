import { IEventHandler, EventHandler, EventEnvelope} from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaymentRequested } from "../../impl/applicant/applicant-fee-payment-requested.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationFee } from "../../../model/applicants/application-fee.model";

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
      relations: ["recommendations", "applicationFee"],
    });
    applicant.applicationFee = new ApplicationFee();
    applicant.applicationFee.dueAmount = event.amount;
  
    await this.repository.save(applicant);
  }
}
