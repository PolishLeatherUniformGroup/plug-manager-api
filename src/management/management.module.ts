import { Module } from "@nestjs/common";
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
import { ApplicantApplied } from "./events/impl/applicant/applicant-applied.event";
import { ApplicantRecommendationsValidatedNegative } from "./events/impl/applicant/applicant-recommendations-invalid.events";
import { ApplicantRecommendationsValidatedPositive } from "./events/impl/applicant/applicant-recommendations-valid.event";
import { ApplicantRecommendationApproved } from "./events/impl/applicant/applicant-recommendation-approved.event";
import { ApplicantRecommendationRejected } from "./events/impl/applicant/applicant-recommendation-rejected.event";
import { ApplicantNotRecommended } from "./events/impl/applicant/applicant-application-not-recommended.events";
import { ApplicantFeePaymentRequested } from "./events/impl/applicant/applicant-fee-payment-requested.event";
import { ApplicantFeePaid } from "./events/impl/applicant/applicant-fee-paid.event";
import { ApplicantApplicationAccepted } from "./events/impl/applicant/applicant-application-accepted.event";
import { ApplicantApplicationRejected } from "./events/impl/applicant/applicant-application-rejected.event";
import { ApplicantAppealedRejection } from "./events/impl/applicant/applicant-appealed-rejection.event";
import { ApplicantAppealOverDeadline } from "./events/impl/applicant/applicant-appeal-over-deadline.event";
import { ApplicantAppealAccepted } from "./events/impl/applicant/applicant-appeal-accepted.event";
import { ApplicantAppealRejected } from "./events/impl/applicant/applicant-appeal-rejected.event";
import { MemberCreated } from "./events/impl/member/member-created.event";
import { MemberContactDataUpdated } from "./events/impl/member/member-contact-data-updated.event";
import { MemberMembershipFeePaid } from "./events/impl/member/member-membership-fee-paid.event";
import { MemberMembershipFeePaymentRequested } from "./events/impl/member/member-membership-fee-payment-requested.event";
import { MemberSuspended } from "./events/impl/member/member-suspended.event";
import { MemberSuspensionApealed } from "./events/impl/member/member-suspension-apealed.event";
import { MemberSuspensionApealAccepted } from "./events/impl/member/member-suspension-appeal-accepted.event";
import { MemberSuspensionApealRejected } from "./events/impl/member/member-suspension-appeal-rejected.event";
import { MemberResinstated } from "./events/impl/member/member-reinstated.events";
import { MemberExpelled } from "./events/impl/member/member-expelled.event";
import { MemberExpulsionApealed } from "./events/impl/member/member-expulsion-appealed.event";
import { MemberExpulsionApealAccepted } from "./events/impl/member/member-expulsion-appeal-accepted.event";
import { MemberExpulsionApealRejected } from "./events/impl/member/member-expulsion-appeal-rejected.event";
import { MemberMembershipTerminated } from "./events/impl/member/member-membership-terminated.event";

@Module({
  imports: [TypeOrmModule.forFeature([Member, Applicant, MemberCard])],
  controllers: [MembersController, ApplicantsController],
  providers: [...Services, ...ApplicantDomain,...MemberDomain, MembersScheduler],
})
export class ManagementModule { }

export const Events = [
	ApplicantApplied,
	ApplicantRecommendationsValidatedNegative,
	ApplicantRecommendationsValidatedPositive,
  ApplicantRecommendationApproved,
  ApplicantRecommendationRejected,
  ApplicantNotRecommended,
  ApplicantFeePaymentRequested,
  ApplicantFeePaid,
  ApplicantApplicationAccepted,
  ApplicantApplicationRejected,
  ApplicantAppealedRejection,
  ApplicantAppealOverDeadline,
  ApplicantAppealAccepted,
  ApplicantAppealRejected,
  MemberCreated,
  MemberContactDataUpdated,
  MemberMembershipFeePaymentRequested,
  MemberMembershipFeePaid,
  MemberSuspended,
  MemberSuspensionApealed,
  MemberSuspensionApealAccepted,
  MemberSuspensionApealRejected,
  MemberResinstated,
  MemberExpelled,
  MemberExpulsionApealed,
  MemberExpulsionApealAccepted,
  MemberExpulsionApealRejected,
  MemberMembershipTerminated
];
