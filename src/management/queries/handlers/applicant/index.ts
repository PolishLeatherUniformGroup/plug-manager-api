import { GetApplicantHandler } from "./get-applicant.handler";
import { GetApplicantsHandler } from "./get-applicants.handler";
import { GetApplicationStatusHandler } from "./get-application-status.handler";
import { GetAwaitingRecommendationsHandler } from "./get-awaiting-recommendations.handler";

export const ApplicantQueryHandlers = [
    GetApplicantHandler,
    GetApplicantsHandler,
    GetApplicationStatusHandler,
    GetAwaitingRecommendationsHandler
];