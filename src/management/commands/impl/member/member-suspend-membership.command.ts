import { ICommand } from "@ocoda/event-sourcing";

export class MemberSuspendMembership implements ICommand {
  constructor(
    public readonly id: string,
    public readonly suspendDate: Date,
    public readonly suspendReason: string,
    public readonly suspendUntilDate: Date,
    public readonly appealDeadline: Date,
  ) {}
}
