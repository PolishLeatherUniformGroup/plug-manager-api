import { ApplicantFeePaidHandler } from "../../../events/handlers/applicant/applicant-fee-paid.handler";
import { ApplicantFeePaymentRequestedHandler } from "../../../events/handlers/applicant/applicant-fee-payment-requested.handler";
import { ApplicantAcceptApplicationHandler } from "./applicant-accept-application.handler";
import { ApplicantAppealAcceptHandler } from "./applicant-appeal-accept.handler";
import { ApplicantRejectAppealHandler } from "./applicant-appeal-reject.handler";
import { ApplicantAppealRejectionHandler } from "./applicant-appeal-rejection.handler";
import { ApplicantApplyHandler } from "./applicant-apply.handler";
import { ApplicantApproveRecommendationHandler } from "./applicant-approve-recommendation.handler";
import { ApplicantRejectApplicationHandler } from "./applicant-reject-application.handler";
import { ApplicantRejectRecommendationHandler } from "./applicant-reject-recommendation.handler";
import { ApplicantVerifyRecommendationsHandler } from './applicant-verify-recommendations.handler';

export const ApplicantCommandHandlers = [
    ApplicantApplyHandler,
    ApplicantVerifyRecommendationsHandler,
    ApplicantApproveRecommendationHandler,
    ApplicantRejectRecommendationHandler,
    ApplicantFeePaymentRequestedHandler,
    ApplicantFeePaidHandler,
    ApplicantAcceptApplicationHandler,
    ApplicantRejectApplicationHandler,
    ApplicantAppealRejectionHandler,
    ApplicantAppealAcceptHandler,
    ApplicantRejectAppealHandler
];