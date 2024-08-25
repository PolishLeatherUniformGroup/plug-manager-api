import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantApply } from "../../impl/applicant/applicant-apply.command";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { v4 as uuidv4 } from 'uuid';
import { Applicant } from "../../../domain/applicant/applicant.aggregate";
import { MapperService } from "../../../services/maper.service";

@CommandHandler(ApplicantApply)
export class ApplicantApplyHandler implements ICommandHandler<ApplicantApply> {
    constructor(private readonly publisher: StoreEventPublisher,
        private readonly mapperService: MapperService
    ) { }

    async execute(command: ApplicantApply) {
        try {
            const id = uuidv4();
            const { firstName, lastName, email, applyDate, birthDate, address, recommenderCards, phoneNumber } =
                command;

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

            applicant.commit();
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}