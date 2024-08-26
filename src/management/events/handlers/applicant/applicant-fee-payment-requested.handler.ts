import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaymentRequested } from "../../impl/applicant/applicant-fee-payment-requested.event";

@ViewUpdaterHandler(ApplicantFeePaymentRequested)
export class ApplicantFeePaymentRequestedHandler implements IViewUpdater<ApplicantFeePaymentRequested> {

    constructor(private readonly repository: Repository<Applicant>) { }

    async handle(event: ApplicantFeePaymentRequested): Promise<void> {
        var applicant = await this.repository
            .findOne({
                where: { id: event.id },
                relations: ["recommendations"]
            });
        applicant.applicationFee.dueAmount = event.amount;

        await this.repository.save(applicant);
    }
}