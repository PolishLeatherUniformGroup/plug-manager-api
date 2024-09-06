import { ICommand } from "@ocoda/event-sourcing";

export class ActivateMemberCommand implements ICommand {
    public constructor(public readonly id: string) {
    }
}