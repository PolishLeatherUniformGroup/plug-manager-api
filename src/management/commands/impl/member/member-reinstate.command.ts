import { ICommand } from "@ocoda/event-sourcing";

export class MemberReinstate implements ICommand {
  constructor(public readonly id: string) {}
}
