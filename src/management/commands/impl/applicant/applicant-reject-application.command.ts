import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantRejectApplication implements ICommand {
  constructor(
    public readonly id: string,
    public readonly rejectDate: Date,
    public readonly justification: string,
    public readonly appealDeadline: Date,
  ) {}
}
