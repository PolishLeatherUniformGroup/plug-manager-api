import { ICommand } from "@nestjs/cqrs";

export class PublishSectionCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly publishedBy: string,
        public readonly publishedAt: Date,
    ) { }
}