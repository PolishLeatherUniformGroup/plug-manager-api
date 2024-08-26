import { ICommand } from "@nestjs/cqrs";

export class ApplicantAppealRejection implements ICommand {
  constructor(
    public readonly id: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
