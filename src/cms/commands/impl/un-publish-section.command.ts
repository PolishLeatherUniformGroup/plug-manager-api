import { ICommand } from "@ocoda/event-sourcing";

export class UnPublishSectionCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly updatedBy: string,
        public readonly updatedAt: Date,
    ) { }
}