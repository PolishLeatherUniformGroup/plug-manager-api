import { ICommand } from "@ocoda/event-sourcing";

export class PublishSectionCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly publishedBy: string,
        public readonly publishedAt: Date,
    ) { }
}