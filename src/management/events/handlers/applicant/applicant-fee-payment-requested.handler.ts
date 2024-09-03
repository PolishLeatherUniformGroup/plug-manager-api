import { IEventHandler, EventHandler, EventEnvelope } from "@ocoda/event-sourcing";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaymentRequested } from "../../impl/applicant/applicant-fee-payment-requested.event";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationFee } from "../../../model/applicants/application-fee.model";
import { Logger } from "@nestjs/common";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";

@EventHandler(ApplicantFeePaymentRequested)
export class ApplicantFeePaymentRequestedHandler
  implements IEventHandler {
  private readonly logger = new Logger(ApplicantFeePaymentRequestedHandler.name);
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
  ) { }

  async handle(envelope: EventEnvelope<ApplicantFeePaymentRequested>): Promise<void> {
    this.logger.log(`ApplicantFeePaymentRequested event received`);
    const event = envelope.payload;
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations", "applicationFee", "applicationStatuses"],
    });
    let applicationFee = new ApplicationFee();
    applicationFee.dueAmount = event.amount;
    applicationFee.applicant = applicant;

    applicant.applicationFee = applicationFee;

    let status = new ApplicationStatus();
    status.status = ApplicantStatus.AwaitPayment;
    status.date = new Date();
    status.applicant = applicant;
    status.comment = "Wniosek oczekuja na opłacenie składki";
    applicant.applicationStatuses.push(status);

    await this.repository.save(applicant);
  }
}
