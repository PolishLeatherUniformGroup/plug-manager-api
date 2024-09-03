import { IQueryHandler, QueryHandler } from '@ocoda/event-sourcing';
import { GetAwaitingRecommendations } from '../../impl/applicant/get-awaiting-recommendations.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from '../../../model/applicants/applicant.model';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAwaitingRecommendations)
export class GetAwaitingRecommendationsHandler implements IQueryHandler<GetAwaitingRecommendations, Applicant[]> {
    private readonly logger = new Logger(GetAwaitingRecommendationsHandler.name);
    constructor(@InjectRepository(Applicant) private readonly repository: Repository<Applicant>) { }
    async execute(query: GetAwaitingRecommendations): Promise<Applicant[]> {
        this.logger.log(`GetAwaitingRecommendations query received ${query.cardOrId}`);
        const applicants = await this.repository.find({
            relations: ['recommendations', 'applicationStatuses'],
        });
        return applicants.filter((applicant) =>
            applicant.recommendations.some((recommendation) =>
                recommendation.isRecommended !== true && (recommendation.cardNumber === query.cardOrId)));
    }
}