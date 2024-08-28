import { ICommand } from "@ocoda/event-sourcing";

export class MemberExpell implements ICommand {
  constructor(
    public readonly id: string,
    public readonly expellDate: Date,
    public readonly expulsionReason: string,
    public readonly appealDeadline: Date,
  ) {}
}
