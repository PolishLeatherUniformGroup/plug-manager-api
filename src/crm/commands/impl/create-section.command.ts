import { ICommand } from "@ocoda/event-sourcing";

export class CreateSectionCommand implements ICommand {
    constructor(
        public readonly slug: string,
        public readonly title: string, 
        public readonly showInMenu: boolean, 
        public readonly language: string = "PL", 
        public readonly createdBy: string,
        public readonly createdAt: Date,
        public readonly content?: string,
        public readonly description?: string,
        public readonly keywords?: string[],
    ) { }
}