import { ICommand } from "@ocoda/event-sourcing";

export class MemberRequestFeePayment implements ICommand {
    constructor(
        public readonly id: string,
        public readonly year: number,
    ) { }
}