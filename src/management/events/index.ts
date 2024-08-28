import { ApplicantAppealAccepted } from "./impl/applicant/applicant-appeal-accepted.event";
import { ApplicantAppealOverDeadline } from "./impl/applicant/applicant-appeal-over-deadline.event";
import { ApplicantAppealRejected } from "./impl/applicant/applicant-appeal-rejected.event";
import { ApplicantAppealedRejection } from "./impl/applicant/applicant-appealed-rejection.event";
import { ApplicantApplicationAccepted } from "./impl/applicant/applicant-application-accepted.event";
import { ApplicantNotRecommended } from "./impl/applicant/applicant-application-not-recommended.events";
import { ApplicantApplicationRejected } from "./impl/applicant/applicant-application-rejected.event";
import { ApplicantApplied } from "./impl/applicant/applicant-applied.event";
import { ApplicantFeePaid } from "./impl/applicant/applicant-fee-paid.event";
import { ApplicantFeePaymentRequested } from "./impl/applicant/applicant-fee-payment-requested.event";
import { ApplicantRecommendationApproved } from "./impl/applicant/applicant-recommendation-approved.event";
import { ApplicantRecommendationRejected } from "./impl/applicant/applicant-recommendation-rejected.event";
import { ApplicantRecommendationsValidatedNegative } from "./impl/applicant/applicant-recommendations-invalid.events";
import { ApplicantRecommendationsValidatedPositive } from "./impl/applicant/applicant-recommendations-valid.event";
import { MemberContactDataUpdated } from "./impl/member/member-contact-data-updated.event";
import { MemberCreated } from "./impl/member/member-created.event";
import { MemberExpelled } from "./impl/member/member-expelled.event";
import { MemberExpulsionApealAccepted } from "./impl/member/member-expulsion-appeal-accepted.event";
import { MemberExpulsionApealRejected } from "./impl/member/member-expulsion-appeal-rejected.event";
import { MemberExpulsionApealed } from "./impl/member/member-expulsion-appealed.event";
import { MemberImported } from "./impl/member/member-imported.event";
import { MemberMembershipFeePaid } from "./impl/member/member-membership-fee-paid.event";
import { MemberMembershipFeePaymentRequested } from "./impl/member/member-membership-fee-payment-requested.event";
import { MemberMembershipTerminated } from "./impl/member/member-membership-terminated.event";
import { MemberResinstated } from "./impl/member/member-reinstated.events";
import { MemberSuspended } from "./impl/member/member-suspended.event";
import { MemberSuspensionApealed } from "./impl/member/member-suspension-apealed.event";
import { MemberSuspensionApealAccepted } from "./impl/member/member-suspension-appeal-accepted.event";
import { MemberSuspensionApealRejected } from "./impl/member/member-suspension-appeal-rejected.event";

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
    MemberMembershipTerminated,
    MemberImported
];