import { IQueryHandler, QueryHandler } from "@ocoda/event-sourcing";
import { GetApplicant } from "../../impl/applicant/get-applicant.query";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetApplicant)
export class GetApplicantHandler implements IQueryHandler<GetApplicant,Applicant|null> {

  constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant | null>) { }

  public async execute(query: GetApplicant): Promise<Applicant> {
    return await this.repository.findOne({
      where: {
        id: query.id,
      },
      relations: ["recommendations", "applicationFee"],
    });
  }
}