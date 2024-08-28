import { ICommand } from "@ocoda/event-sourcing";

export class MemberRejectExpulsionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly rejectDate: Date,
    public readonly justification: string,
  ) {}
}
