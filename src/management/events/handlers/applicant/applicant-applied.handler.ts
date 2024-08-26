import { ApplicantApplied } from "../../impl/applicant/applicant-applied.event";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { MapperService } from "../../../services/maper.service";
import { Recommendation } from "../../../model/applicants/recommendation.model";
import { ApplicationProcess } from "../../../model/applicants/application-process.model";
import { InjectRepository } from "@nestjs/typeorm";

@ViewUpdaterHandler(ApplicantApplied)
export class ApplicantAppliedHandler implements IViewUpdater<ApplicantApplied> {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
    private readonly mapper: MapperService,
  ) {}
  async handle(event: ApplicantApplied): Promise<void> {
    var applicant = new Applicant();
    applicant.id = event.id;
    applicant.firstName = event.firstName;
    applicant.lastName = event.lastName;
    applicant.email = event.email;
    applicant.phone = event.phoneNumber;
    applicant.birthDate = event.birthDate;
    applicant.applyDate = event.applyDate;
    applicant.status = ApplicantStatus.New;
    applicant.address = this.mapper.mapToViewObject(event.address);
    applicant.applicationProcess = new ApplicationProcess();
    applicant.applicationProcess.applyDate = event.applyDate;

    applicant.recommendations = event.recommendations.map((recommendation) => {
      return {
        id: recommendation.id,
        cardNumber: recommendation.cardNumber,
        isValid: recommendation.isValid,
        isRecommended: recommendation.isRecommended,
        applicant: applicant,
      } as Recommendation;
    });

    await this.repository.save(applicant);
  }
}
