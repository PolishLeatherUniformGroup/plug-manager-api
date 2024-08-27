import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { ApplicantRecommendationsValid } from "../../impl/applicant/applicant-recommendations-valid.event";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";

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
    let status =new ApplicationStatus();
    status.status = event.status;
    status.date = new Date();
    status.applicant = applicant;

    applicant.applicationStatuses.push(status);
    applicant.recommendations.forEach((recommendation) => {
      recommendation.isValid = true;
    });

    await this.repository.save(applicant);
  }
}
