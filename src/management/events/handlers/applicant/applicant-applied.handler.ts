import { ApplicantApplied } from "../../impl/applicant/applicant-applied.event";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Repository } from "typeorm";
import { Applicant } from "../../../model/applicants/applicant.model";
import { ApplicantStatus } from "../../../domain/applicant/applicant-status.enum";
import { MapperService } from "../../../services/maper.service";
import { Recommendation } from "../../../model/applicants/recommendation.model";
import { ApplicationProcess } from "../../../model/applicants/application-process.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationStatus } from "../../../model/applicants/application-status.model";
import { Logger } from "@nestjs/common";

@ViewUpdaterHandler(ApplicantApplied)
export class ApplicantAppliedHandler implements IViewUpdater<ApplicantApplied> {
  private readonly logger = new Logger(ApplicantAppliedHandler.name);
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
    private readonly mapper: MapperService,
  ) { }
  async handle(event: ApplicantApplied): Promise<void> {
    this.logger.log(`Handling event ${event.constructor.name}`);
    var applicant = new Applicant();
    applicant.id = event.id;
    applicant.firstName = event.firstName;
    applicant.lastName = event.lastName;
    applicant.email = event.email;
    applicant.phone = event.phoneNumber;
    applicant.birthDate = event.birthDate;
    applicant.applyDate = event.applyDate;

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

    let status = new ApplicationStatus();
    status.status = ApplicantStatus.New;
    status.date = new Date();
    status.applicant = applicant;
    applicant.applicationStatuses = [status];

    await this.repository.save(applicant);
  }
}
