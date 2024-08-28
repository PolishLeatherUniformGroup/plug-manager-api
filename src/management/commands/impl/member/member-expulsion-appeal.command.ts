import { ICommand } from "@ocoda/event-sourcing";

export class MemberExpulsionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
