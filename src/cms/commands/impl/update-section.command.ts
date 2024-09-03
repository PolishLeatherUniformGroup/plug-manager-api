import { ICommand } from "@ocoda/event-sourcing";

export class UpdateSectionCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly slug: string,
        public readonly title: string, 
        public readonly showInMenu: boolean, 
        public readonly updatedBy: string,
        public readonly updatedAt: Date,
        public readonly content?: string,
        public readonly description?: string,
        public readonly keywords?: string[],
    ) { }
}