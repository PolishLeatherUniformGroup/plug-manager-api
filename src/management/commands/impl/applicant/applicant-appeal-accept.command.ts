import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantAppealAccept implements ICommand {
  constructor(
    public readonly id: string,
    public readonly appealAccept: Date,
  ) {}
}
