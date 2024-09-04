import { ICommand } from "@ocoda/event-sourcing";

export class UpdateSectionCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly title: string, 
        public readonly showInMenu: boolean, 
        public readonly updatedBy: string,
        public readonly updatedAt: Date,
        public readonly description?: string,
        public readonly keywords?: string[],
    ) { }
}