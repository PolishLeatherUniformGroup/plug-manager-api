import { ICommand } from "@nestjs/cqrs";

export class ApplicantAppealAccept implements ICommand {
    constructor(public readonly id: string,
        public readonly appealAccept: Date
    ) { }
}