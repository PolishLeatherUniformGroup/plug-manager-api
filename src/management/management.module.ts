import { Module } from '@nestjs/common';
import { MembersController } from './controllers/members.controller';
import { ApplicantsController } from './controllers/applicants.controller';
import { Services } from './services';

@Module({
  controllers: [MembersController, ApplicantsController],
  providers: [...Services,]
})
export class ManagementModule { }
