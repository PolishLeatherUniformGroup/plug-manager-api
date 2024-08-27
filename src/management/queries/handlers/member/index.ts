import { GetMemberFeesHandler } from "./get-member-fees.handler";
import { GetMemberHandler } from "./get-member.handler";
import { GetMembersHandler } from "./get-members.query";
import { GetMemberSuspensionsHandler } from "./get-members-supsensions.handler";
import { GetMemberExpulsionsHandler } from "./get-member-expulsions.handler";

export const MemberQueryHandlers = [
    GetMemberHandler,
    GetMembersHandler,
    GetMemberFeesHandler,
    GetMemberSuspensionsHandler,
    GetMemberExpulsionsHandler
];