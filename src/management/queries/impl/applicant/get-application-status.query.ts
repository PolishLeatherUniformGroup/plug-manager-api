import { IQuery } from "@nestjs/cqrs";

export class GetApplicationStatus  implements IQuery {
    constructor(public readonly id: string) {}
}