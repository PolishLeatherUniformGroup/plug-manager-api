import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { ApplicantRecommendationsValid } from "../../impl/applicant/applicant-recommendations-valid.event";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantRecommendationsValid)
export class ApplicantRecommendationsValidHandler
  implements IViewUpdater<ApplicantRecommendationsValid> {
  constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant>) { }

  async handle(
    @InjectRepository(Applicant) event: ApplicantRecommendationsValid,
  ): Promise<void> {
    var applicant = await this.repository.findOne({
      where: { id: event.id },
      relations: ["recommendations"],
    });
    applicant.status = event.status;
    applicant.recommendations.forEach((recommendation) => {
      recommendation.isValid = true;
    });

    await this.repository.save(applicant);
  }
}
