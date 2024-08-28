import { ICommand } from "@ocoda/event-sourcing";
export class MemberTerminateMembership implements ICommand {
  constructor(
    public readonly id: string,
    public readonly terminateDate: Date,
  ) {}
}
