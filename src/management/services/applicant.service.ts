import { Repository } from "typeorm";
import { Applicant } from "../model/applicants/applicant.model";
import { Apply } from "../dto/requests/apply.request";

export class ApplicantService {
  constructor(private readonly repository: Repository<Applicant>) { }

  public async get(id: string): Promise<Applicant | null> {
    return await this.repository.findOneBy({
      id: id,
    });
  }

  public async apply(request: Apply): Promise<void> {
    // Implement this method
  }
}
