import { ICommand } from "@ocoda/event-sourcing";

export class MemberAcceptExpulsionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly acceptDate: Date,
  ) {}
}
