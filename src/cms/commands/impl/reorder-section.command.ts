import { ICommand } from "@ocoda/event-sourcing";

export class ReorderSection implements ICommand {
    constructor(public readonly id: number,
        public readonly order: number,
        public readonly updatedBy: string,
        public readonly updatedAt: Date) { }
}