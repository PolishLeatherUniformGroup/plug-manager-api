import { MemberCommandHandlers } from "../../commands/handlers/member";
import { MemberEventHandlers } from "../../events/handlers/member";
import { MemberQueryHandlers } from "../../queries/handlers/member";
import { MemberSaga } from "../../sagas/member.saga";
import { MemberService } from "../../services/member.service";
import { MemberAggregateRepository } from "./member.aggregate-repository";

export const MemberDomain = [
  MemberAggregateRepository,
  ...MemberEventHandlers,
  ...MemberCommandHandlers,
  ...MemberQueryHandlers,
  MemberSaga,
  MemberService,
];
