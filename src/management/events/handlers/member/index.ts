import { MemberContactDataUpdatedHandler } from "./member-contact-data-updated.handler";
import { MemberCreatedHandler } from "./member-created.handler";
import { MemberExpulsionApealedHandler } from "./member-expulsion-appealed.handler";
import { MemberMembershipFeePaidHandler } from "./member-membership-fee-paid.handler";
import { MemberMembershipFeePaymentRequestedHandler } from "./member-membership-fee-payment-requested.handler";
import { MemberSuspendedHandler } from "./member-suspended.handler";
import { MemberSuspensionApealAcceptedHandler } from "./member-suspension-appeal-accepted.handler";
import { MemberSuspensionApealRejectedHandler } from "./member-suspension-appeal-rejected.handler";
import { MemberReinstateHandler } from '../../../commands/handlers/member/member-reinstate.handler';
import { MemberExpelledHandler } from "./member-expelled.handler";
import { MemberExpulsionApealAcceptedHandler } from "./member-expulsion-appeal-accepted.handler";
import { MemberExpulsionApealRejectedHandler } from "./member-expulsion-appeal-rejected.handler";
import { MemberMembershipTerminatedHandler } from "./member-membership-terminated.handler";
import { MemberSuspensionApealedHandler } from "./member-suspension-appealed.handler";

export const MemberEventHandlers = [
    MemberCreatedHandler,
    MemberContactDataUpdatedHandler,
    MemberMembershipFeePaymentRequestedHandler,
    MemberMembershipFeePaidHandler,
    MemberSuspendedHandler,
    MemberSuspensionApealedHandler,
    MemberSuspensionApealAcceptedHandler,
    MemberSuspensionApealRejectedHandler,
    MemberReinstateHandler,
    MemberExpelledHandler,
    MemberExpulsionApealedHandler,
    MemberExpulsionApealAcceptedHandler,
    MemberExpulsionApealRejectedHandler,
    MemberMembershipTerminatedHandler
];