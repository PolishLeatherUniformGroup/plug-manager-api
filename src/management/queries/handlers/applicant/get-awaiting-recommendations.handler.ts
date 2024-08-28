import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAwaitingRecommendations } from '../../impl/applicant/get-awaiting-recommendations.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from '../../../model/applicants/applicant.model';
import { Repository } from 'typeorm';

@QueryHandler(GetAwaitingRecommendations)
export class GetAwaitingRecommendationsHandler implements IQueryHandler<GetAwaitingRecommendations, Applicant[]> {
    constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant>) { }
    async execute(query:GetAwaitingRecommendations) :Promise<Applicant[]> {
        const applicants = await this.repository.find({
            relations: ['recommendations'],
        });
        return applicants.filter((applicant) =>
            applicant.recommendations.some((recommendation) =>
                recommendation.isRecommended !== true && (recommendation.cardNumber === query.cardOrId )));
    }
}