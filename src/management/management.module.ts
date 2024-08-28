import { Module, OnModuleInit } from "@nestjs/common";
import { MembersController } from "./controllers/members.controller";
import { ApplicantsController } from "./controllers/applicants.controller";
import { Services } from "./services";
import { ApplicantDomain } from "./domain/applicant";
import { MembersScheduler } from "./schedulers/members.scheduler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./model/members/member.model";
import { Applicant } from "./model/applicants/applicant.model";
import { MemberCard } from "./model/members/card.model";
import { MemberDomain } from "./domain/member";
import { EventSourcingModule, EventStore } from "@ocoda/event-sourcing";
import { Events } from "./events";

@Module({
  imports: [TypeOrmModule.forFeature([Member, Applicant, MemberCard]),
  EventSourcingModule.forRoot({
    eventStore:{
      client: 'mongodb',
      options: {
        url: 'mongodb://localhost:27017/evets',
      },
    },
    events: [...Events],
  })],
  controllers: [MembersController, ApplicantsController],
  providers: [...Services, ...ApplicantDomain,...MemberDomain],
})
export class ManagementModule  implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}
  onModuleInit(): any {
    this.eventStore.setup();
  }
 }


