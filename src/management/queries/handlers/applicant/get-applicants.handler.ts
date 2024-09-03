import { IQueryHandler, QueryHandler } from "@ocoda/event-sourcing";
import { InjectRepository } from "@nestjs/typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { Repository } from "typeorm";
import { GetApplicants } from "../../impl/applicant/get-applicants.query";

@QueryHandler(GetApplicants)
export class GetApplicantsHandler implements IQueryHandler<GetApplicants, Applicant[]> {
    constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant>) { }
    async execute(query: GetApplicants): Promise<Applicant[]> {
        const all = await this.repository.find({
            relations: [
                "applicationStatuses",
                "recommendations",
                "applicationFee",
                "applicationProcess",]
        })
        if (!query.status) return all;
        {
            return all.filter((applicant) => applicant.status() === query.status);
        }
    }
}