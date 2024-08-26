import { Repository } from "typeorm";
import { Applicant } from "../model/applicants/applicant.model";

export class ApplicantService {
  constructor(private readonly repository: Repository<Applicant>) {}

  public async get(id: string): Promise<Applicant | null> {
    return await this.repository.findOneBy({
      id: id,
    });
  }
}
