import { ApplicantCommandHandlers } from "../../commands/handlers/applicant";
import { ApplicantEventHandlers } from "../../events/handlers/applicant";
import { ApplicantQueryHandlers } from "../../queries/handlers/applicant";
import { ApplicantSaga } from "../../sagas/applicant.saga";
import { ApplicantService } from "../../services/applicant.service";
import { ApplicantAggregateRepository } from "./applicant.aggregate-repository";

export const ApplicantDomain = [
  ApplicantAggregateRepository,
  ...ApplicantEventHandlers,
  ...ApplicantCommandHandlers,
  ...ApplicantQueryHandlers,
  ApplicantSaga,
  ApplicantService,
];
