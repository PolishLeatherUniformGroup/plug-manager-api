import { ApplicantCommandHandlers } from "../../commands/handlers/applicant";
import { ApplicantEventHandlers } from "../../events/handlers/applicant";
import { Sagas } from "../../sagas";
import { ApplicantAggregateRepository } from "./applicant.aggregate-repository";

export const ApplicantDomain = [
  ApplicantAggregateRepository,
  ...ApplicantEventHandlers,
  ...ApplicantCommandHandlers,
  ...Sagas,
];
