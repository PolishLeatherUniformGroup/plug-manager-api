import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantFeePaid } from "../../impl/applicant/applicant-fee-paid.event";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantFeePaid)
export class ApplicantFeePaidHandler implements IViewUpdater<ApplicantFeePaid> {
    constructor(
        @InjectRepository(Applicant)
        private readonly repository: Repository<Applicant>,
    ) { }

    async handle(event: ApplicantFeePaid): Promise<void> {
        var applicant = await this.repository.findOne({
            where: { id: event.id },
            relations: ["recommendations"],
        });
        applicant.applicationFee.paidAmount = applicant.applicationFee.paidAmount;
        applicant.applicationFee.paidDate = event.paidDate;

        await this.repository.save(applicant);
    }
}
