import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetApplicationStatus } from '../../impl/applicant/get-application-status.query';
import { ApplicationStatus } from '../../../model/applicants/application-status.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from '../../../model/applicants/applicant.model';
import { Repository } from 'typeorm';

@QueryHandler(GetApplicationStatus)
export class GetApplicationStatusHandler implements IQueryHandler<GetApplicationStatus, ApplicationStatus[]> {
    constructor(
        @InjectRepository(Applicant) private readonly repository: Repository<Applicant>,
    ) { }
    async execute(query: GetApplicationStatus): Promise<ApplicationStatus[]> {
        var applicant = await this.repository.findOne({where: {id:query.id}, relations: ["applicationStatuses"] });
        return applicant.applicationStatuses;
    }
}
