import { ICommand } from "@ocoda/event-sourcing";

export class ReparentSection  implements ICommand {
    constructor(
        public readonly id: number,        
        public readonly updatedBy: string,
        public readonly updatedAt: Date,
        public readonly parentId?: number) { }

}