import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAwaitingRecommendations } from '../../impl/applicant/get-awaiting-recommendations.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from '../../../model/applicants/applicant.model';
import { Repository } from 'typeorm';
import { ApplicantStatus } from '../../../domain/applicant/applicant-status.enum';

@QueryHandler(GetAwaitingRecommendations)
export class GetAwaitingRecommendationsHandler implements IQueryHandler<GetAwaitingRecommendations> {
    constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant>) { }
    async execute(query) :Promise<Applicant[]> {
        const applicants = await this.repository.find({
            relations: ['recommendations'],
        });
        return applicants.filter((applicant) =>
            applicant.recommendations.some((recommendation) =>
                recommendation.isRecommended !== true && (recommendation.cardNumber === query.cardOrId || recommendation.id === query.cardOrId)));
    }
}