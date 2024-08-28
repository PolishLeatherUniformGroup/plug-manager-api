import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { ApplicantApply } from "../../impl/applicant/applicant-apply.command";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";
import { MapperService } from "../../../services/maper.service";
import { Logger } from "@nestjs/common";
import { ApplicantId } from "../../../domain/applicant/applicant-id";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";

@CommandHandler(ApplicantApply)
export class ApplicantApplyHandler implements ICommandHandler {
  private readonly logger = new Logger(ApplicantApplyHandler.name);
  constructor(
    private readonly applicantRepository: ApplicantAggregateRepository,
    private readonly mapperService: MapperService,
  ) { }

  async execute(command: ApplicantApply) {
    try {
      this.logger.log(`${ApplicantApplyHandler.name} command received command`);
      const id = ApplicantId.generate();
      const {
        firstName,
        lastName,
        email,
        applyDate,
        birthDate,
        address,
        recommenderCards,
        phoneNumber,
      } = command;

      const applicant = Applicant.create(
          id,
          firstName,
          lastName,
          email,
          this.mapperService.mapToDomainObject(address),
          applyDate,
          birthDate,
          recommenderCards,
          phoneNumber,
        );
      await this.applicantRepository.save(applicant);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
