import { ApplicantAcceptApplicationHandler } from "./applicant-accept-application.handler";
import { ApplicantAppealAcceptHandler } from "./applicant-appeal-accept.handler";
import { ApplicantRejectAppealHandler } from "./applicant-appeal-reject.handler";
import { ApplicantAppealRejectionHandler } from "./applicant-appeal-rejection.handler";
import { ApplicantApplyHandler } from "./applicant-apply.handler";
import { ApplicantApproveRecommendationHandler } from "./applicant-approve-recommendation.handler";
import { ApplicantRegisterFeePaymentHandler } from "./applicant-fee-payment-register.handler";
import { ApplicantRejectApplicationHandler } from "./applicant-reject-application.handler";
import { ApplicantRejectRecommendationHandler } from "./applicant-reject-recommendation.handler";
import { ApplicantRequestFeePaymentHandler } from "./applicant-request-fee-payment-handler";
import { ApplicantVerifyRecommendationsHandler } from "./applicant-verify-recommendations.handler";

export const ApplicantCommandHandlers = [
  ApplicantApplyHandler,
  ApplicantVerifyRecommendationsHandler,
  ApplicantApproveRecommendationHandler,
  ApplicantRejectRecommendationHandler,
  ApplicantRequestFeePaymentHandler,
  ApplicantRegisterFeePaymentHandler,
  ApplicantAcceptApplicationHandler,
  ApplicantRejectApplicationHandler,
  ApplicantAppealRejectionHandler,
  ApplicantAppealAcceptHandler,
  ApplicantRejectAppealHandler,
];
