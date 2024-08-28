import { ICommand } from "@ocoda/event-sourcing";

export class MemberSuspensionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
