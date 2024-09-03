import { Module, OnModuleInit } from "@nestjs/common";
import { MembersController } from "./controllers/members.controller";
import { ApplicantsController } from "./controllers/applicants.controller";
import { Services } from "./services";
import { ApplicantDomain } from "./domain/applicant";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./model/members/member.model";
import { Applicant } from "./model/applicants/applicant.model";
import { MemberDomain } from "./domain/member";
import { EventSourcingModule, EventStore } from "@ocoda/event-sourcing";
import { Events } from "./events";
import { Recommendation } from "./model/applicants/recommendation.model";
import { ApplicationProcess } from "./model/applicants/application-process.model";
import { ApplicationStatus } from "./model/applicants/application-status.model";
import { Identifier } from "./model/settings/identifiers.model";
import { ApplicationFee } from "./model/applicants/application-fee.model";
import { Fee } from "./model/settings/fee.model";
import { SettingsController } from "./controllers/settings.controller";
import { MembershipFee } from "./model/members/membership-fee.model";
import { Suspension } from "./model/members/suspension.model";
import { Expulsion } from "./model/members/expulsion.model";

@Module({
  imports: [TypeOrmModule.forFeature([
    Member, Applicant, // main entities
    Recommendation, ApplicationFee, ApplicationProcess, ApplicationStatus,// applicant sub entities
    MembershipFee, Suspension, Expulsion, // member sub entities
    Identifier, Fee, // settings
  ]),
  EventSourcingModule.forRoot({
    eventStore: {
      client: 'mongodb',
      options: {
        url: 'mongodb://localhost:27017/evets',
      },
    },
    events: [...Events],
  })],
  controllers: [MembersController, ApplicantsController, SettingsController],
  providers: [...Services, ...ApplicantDomain, ...MemberDomain],
})
export class ManagementModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) { }
  onModuleInit(): any {
    this.eventStore.setup();
  }
}


