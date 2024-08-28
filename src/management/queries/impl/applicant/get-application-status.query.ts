import { IQuery } from "@ocoda/event-sourcing";

export class GetApplicationStatus  implements IQuery {
    constructor(public readonly id: string) {}
}