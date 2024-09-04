import { ICommand } from "@nestjs/cqrs";

export class UnPublishSectionCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly updatedBy: string,
        public readonly updatedAt: Date,
    ) { }
}