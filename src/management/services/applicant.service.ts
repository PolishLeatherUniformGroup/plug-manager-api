import { Apply } from "../dto/requests/apply.request";
import { MapperService } from "./maper.service";
import { CommandBus, QueryBus } from "@ocoda/event-sourcing";
import { RecommendationDecision } from "../dto/requests/recommendation-decision.request";
import { ApplicationFee } from "../dto/requests/application-fee.request";
import { AppealDecision, Decision } from "../dto/requests/decision.request";
import { Appeal } from "../dto/requests/appeal.request";
import { Applicant as ApplicantDto } from "../dto/responses/applicant.response";
import { ApplicantRecommendation } from "../dto/responses/applicant-recommendation";
import { GetApplicant } from "../queries/impl/applicant/get-applicant.query";
import { Applicant } from "../model/applicants/applicant.model";
import { GetAwaitingRecommendations } from "../queries/impl/applicant/get-awaiting-recommendations.query";
import { ApplicationStatus } from "../model/applicants/application-status.model";
import { GetApplicationStatus } from "../queries/impl/applicant/get-application-status.query";
import { ApplicationStatus as ApplicationStatusDto } from '../dto/responses/application-status';
import { GetApplicants } from "../queries/impl/applicant/get-applicants.query";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ApplicantService {
  private readonly logger = new Logger(ApplicantService.name);
  constructor(
    private readonly mapper: MapperService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  public async get(id: string): Promise<ApplicantDto | null> {
    try {
      const applicant = await this.queryBus.execute<GetApplicant, Applicant>(this.mapper.buildGetApplicantQuery(id));
      return this.mapper.mapToApplicantDto(applicant);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getApplicantsAwaitingRecommendations(cardOrId: string): Promise<ApplicantRecommendation[]> {
    try {
      let applicants = await this.queryBus.execute<GetAwaitingRecommendations, Applicant[]>(this.mapper.buildGetAwaitingRecommendationsQuery(cardOrId));
      const result = applicants.map(applicant => this.mapper.mapToAwaitingApplicantDto(applicant));
      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getApplicationStatus(id: string): Promise<ApplicationStatusDto[]> {
    try {
      let statuses = await this.queryBus.execute<GetApplicationStatus, ApplicationStatus[]>(this.mapper.buildGetApplicationStatusQuery(id));
      let dtos = statuses.map(status => this.mapper.mapToApplicationStatusDto(status)).sort((a, b) => a.occured.getTime() - b.occured.getTime());
      return dtos.map((dto, index) => { dto.order = index + 1; return dto; });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getApplicants(status: number): Promise<ApplicantDto[]> {
    try {
      let applicants = await this.queryBus.execute<GetApplicants, Applicant[]>(this.mapper.buildGetApplicantsQuery(status));
      return applicants.map(applicant => this.mapper.mapToApplicantDto(applicant));
    }
    catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async apply(request: Apply): Promise<void> {
    try {
      let command = this.mapper.mapToApplyCommand(request);
      await this.commandBus.execute(command);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async recommend(applicantId: string, recommender: string, request: RecommendationDecision): Promise<void> {
    try {
      this.logger.log(`Recommending applicant ${applicantId} by ${recommender}`);
      let command = this.mapper.mapToRecommendationCommand(applicantId, recommender, request);
      await this.commandBus.execute(command);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async registerFeePayment(applicantId: string, fee: ApplicationFee): Promise<void> {
    try {
      let command = this.mapper.mapToFeePaymentCommand(applicantId, fee);
      await this.commandBus.execute(command);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async makeDecision(applicantId: string, decision: Decision): Promise<void> {
    try {
      let command = this.mapper.mapToDecisionCommand(applicantId, decision);
      await this.commandBus.execute(command);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async appealDecision(applicantId: string, appeal: Appeal): Promise<void> {
    try {
      let command = this.mapper.mapToAppealCommand(applicantId, appeal);
      await this.commandBus.execute(command);
    }
    catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async makeAppealDecision(applicantId: string, decision: AppealDecision): Promise<void> {
    try {
      let command = this.mapper.mapToAppealDecisionCommand(applicantId, decision);
      await this.commandBus.execute(command);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
