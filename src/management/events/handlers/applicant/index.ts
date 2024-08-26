import { ApplicantAppealAcceptedHandler } from "./applicant-appeal-accepted.handler";
import { ApplicantAppealOverDeadlineHandler } from "./applicant-appeal-over-deadline.handler";
import { ApplicantAppealedRejectionHandler } from "./applicant-appealed-rejection.handler";
import { ApplicantApplicationAcceptedHandler } from "./applicant-application-accepted.handler";
import { ApplicantNotRecommendedHandler } from "./applicant-application-not-recommended.handler";
import { ApplicantApplicationRejectedHandler } from "./applicant-application-rejected.handler";
import { ApplicantAppliedHandler } from "./applicant-applied.handler";
import { ApplicantFeePaidHandler } from "./applicant-fee-paid.handler";
import { ApplicantFeePaymentRequestedHandler } from "./applicant-fee-payment-requested.handler";
import { ApplicantRecommendationApprovedHandler } from "./applicant-recommendation-approved.handler";
import { ApplicantRecommendationRejectedHandler } from "./applicant-recommendation-rejected.handler";
import { ApplicantRecommendationsNotvalidHandler } from "./applicant-recommendations-invalid.handler";
import { ApplicantRecommendationsValidHandler } from "./applicant-recommendations-valid.handler";

export const ApplicantEventHandlers = [
  ApplicantAppliedHandler,
  ApplicantRecommendationsValidHandler,
  ApplicantRecommendationsNotvalidHandler,
  ApplicantRecommendationApprovedHandler,
  ApplicantRecommendationRejectedHandler,
  ApplicantFeePaymentRequestedHandler,
  ApplicantFeePaidHandler,
  ApplicantApplicationAcceptedHandler,
  ApplicantApplicationRejectedHandler,
  ApplicantAppealedRejectionHandler,
  ApplicantNotRecommendedHandler,
  ApplicantAppealAcceptedHandler,
  ApplicantAppealedRejectionHandler,
  ApplicantAppealOverDeadlineHandler,
];
