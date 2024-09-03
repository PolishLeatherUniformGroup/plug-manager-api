import { MemberAcceptSuspensionAppealHandler } from "./member-accept-suspension-appeal.handler";
import { MemberCreateHandler } from "./member-create.handler";
import { MemberExpellHandler } from "./member-expell.handler";
import { MemberExpulsionAppealHandler } from "./member-expulsion-appeal.handler";
import { MemberRegisterFeePaymentHandler } from "./member-register-fee-payment.handler";
import { MemberReinstateHandler } from "./member-reinstate.handler";
import { MemberRejectSuspensionAppealHandler } from "./member-reject-suspension-appeal.handler";
import { MemberSuspendMembershipHandler } from "./member-suspend-membership.handler";
import { MemberSuspensionAppealHandler } from "./member-suspension-appeal.handler";
import { MemberUpdateContactDataHandler } from "./member-update-contact-data.handler";
import { MemberAcceptExpulsionAppealHandler } from './member-accept-expulsion-appeal.handler';
import { MemberTerminateMembershipHandler } from './member-terminate-membership.handler';
import { MemberImportHandler } from "./member-import.handler";
import { MemberRequestFeePaymentHandler } from "./member-request-fee-payment.handler";
import { MemberOverrideRequestFeePayment } from "../../impl/member/member-override-request-fee-payment.command";

export const MemberCommandHandlers = [
    MemberCreateHandler,
    MemberUpdateContactDataHandler,
    MemberRequestFeePaymentHandler,
    MemberOverrideRequestFeePayment,
    MemberRegisterFeePaymentHandler,
    MemberSuspendMembershipHandler,
    MemberSuspensionAppealHandler,
    MemberAcceptSuspensionAppealHandler,
    MemberRejectSuspensionAppealHandler,
    MemberReinstateHandler,
    MemberExpellHandler,
    MemberExpulsionAppealHandler,
    MemberAcceptExpulsionAppealHandler,
    MemberRejectSuspensionAppealHandler,
    MemberTerminateMembershipHandler,
    MemberImportHandler
]