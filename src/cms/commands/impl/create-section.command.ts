import { ICommand } from "@ocoda/event-sourcing";

export class CreateSectionCommand implements ICommand {
    constructor(
        public readonly slug: string,
        public readonly title: string, 
        public readonly showInMenu: boolean,         
        public readonly createdBy: string,
        public readonly createdAt: Date,
        public readonly language: string = "PL", 
        public readonly order: number = 0,
        public readonly parent?: number,
        public readonly description?: string,
        public readonly keywords?: string[],
    ) { }
}