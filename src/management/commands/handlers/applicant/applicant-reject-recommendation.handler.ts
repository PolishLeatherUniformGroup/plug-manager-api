import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantAggregateRepository } from '../../../domain/applicant/applicant.aggregate-repository';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { ApplicantRejectRecommendation } from '../../impl/applicant/applicant-reject-recommendation.comand';

@CommandHandler(ApplicantRejectRecommendation)
export class ApplicantRejectRecommendationHandler implements ICommandHandler<ApplicantRejectRecommendation> {
    constructor(public readonly applicantRepository: ApplicantAggregateRepository,
        private readonly publisher: StoreEventPublisher
    ) { }
    async execute(command: ApplicantRejectRecommendation): Promise<any> {
        try {
            var applicant = this.publisher.mergeObjectContext(await this.applicantRepository.getById(command.id));
            applicant.approveRecommendation(command.recommenderIdOrCard);
            applicant.commit();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}