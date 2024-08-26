import { ICommand } from "@nestjs/cqrs";

export class MemberSuspensionAppeal implements ICommand {
    constructor(
        public readonly id: string,
        public readonly appealDate: Date,
        public readonly justification: string
    ) { }
}