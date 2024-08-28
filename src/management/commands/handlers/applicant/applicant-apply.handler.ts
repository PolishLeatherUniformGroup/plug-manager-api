import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantApply } from "../../impl/applicant/applicant-apply.command";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { v4 as uuidv4 } from "uuid";
import { Applicant } from "../../../domain/applicant/applicant.aggregate";
import { MapperService } from "../../../services/maper.service";
import { Logger } from "@nestjs/common";

@CommandHandler(ApplicantApply)
export class ApplicantApplyHandler implements ICommandHandler<ApplicantApply> {
  private readonly logger = new Logger(ApplicantApplyHandler.name);
  constructor(
    private readonly publisher: StoreEventPublisher,
    private readonly mapperService: MapperService,
  ) { }

  async execute(command: ApplicantApply) {
    try {
      this.logger.log(`${ApplicantApplyHandler.name} command received command`);
      const id = uuidv4();
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

      const applicant = this.publisher.mergeObjectContext(
        Applicant.create(
          id,
          firstName,
          lastName,
          email,
          this.mapperService.mapToDomainObject(address),
          applyDate,
          birthDate,
          recommenderCards,
          phoneNumber,
        ),
      );

      this.logger.log(`Aggregate applicant created as ${applicant.id}= ${JSON.stringify(applicant)}`);
      applicant.getUncommittedEvents().forEach((event) => {
        this.logger.log(`Event to publish: ${event.constructor.name}`);
      });
      applicant.commit();
      this.logger.log(`Aggregate applicant committed`);
      this.logger.log(`Events left:${applicant.getUncommittedEvents().length}`);

    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
