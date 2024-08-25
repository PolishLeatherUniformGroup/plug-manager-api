import { ICommandHandler } from "@nestjs/cqrs";
import { ApplicantAcceptApplication } from "../../impl/applicant/applicant-accept-application.command"
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";

export class ApplicantAcceptApplicationHandler implements ICommandHandler<ApplicantAcceptApplication> {
    constructor(private readonly applicantRpository:ApplicantAggregateRepository,
        private readonly publisher: StoreEventPublisher
    ) { }
    async execute(command: ApplicantAcceptApplication): Promise<any> {
        try{
            var applicant = this.publisher.mergeObjectContext(await this.applicantRpository.getById(command.id));
            applicant.acceptApplication(command.acceptDate);
            applicant.commit();
        }catch(error){
            console.error(error);
            throw error;
        }
    }

}