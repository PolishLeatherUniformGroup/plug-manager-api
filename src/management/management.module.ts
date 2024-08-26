import { Module } from '@nestjs/common';
import { MembersController } from './controllers/members.controller';
import { ApplicantsController } from './controllers/applicants.controller';
import { Services } from './services';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicantEventHandlers } from './events/handlers/applicant';
import { ApplicantCommandHandlers } from './commands/handlers/applicant';
import { ApplicantAggregateRepository } from './domain/applicant/applicant.aggregate-repository';
import { ApplicantDomain } from './domain/applicant';

@Module({
  imports: [CqrsModule],
  controllers: [MembersController, ApplicantsController],
  providers: [...Services,
  ...ApplicantDomain,
  ]
})
export class ManagementModule { }
