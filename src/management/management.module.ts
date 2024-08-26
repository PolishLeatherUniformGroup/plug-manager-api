import { Module } from "@nestjs/common";
import { MembersController } from "./controllers/members.controller";
import { ApplicantsController } from "./controllers/applicants.controller";
import { Services } from "./services";
import { CqrsModule } from "@nestjs/cqrs";
import { ApplicantDomain } from "./domain/applicant";
import { MembersScheduler } from "./schedulers/members.scheduler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./model/members/member.model";
import { Applicant } from "./model/applicants/applicant.model";
import { MemberCard } from "./model/members/card.model";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Member, Applicant, MemberCard])],
  controllers: [MembersController, ApplicantsController],
  providers: [...Services, ...ApplicantDomain, MembersScheduler],
})
export class ManagementModule { }
