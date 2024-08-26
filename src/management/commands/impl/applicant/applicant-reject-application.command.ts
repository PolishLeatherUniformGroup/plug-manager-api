import { ICommand } from "@nestjs/cqrs";

export class ApplicantRejectApplication implements ICommand {
  constructor(
    public readonly id: string,
    public readonly rejectDate: Date,
    public readonly justification: string,
    public readonly appealDeadline: Date,
  ) {}
}
