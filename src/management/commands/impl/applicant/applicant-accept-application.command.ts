import { ICommand } from "@nestjs/cqrs";

export class ApplicantAcceptApplication implements ICommand {
  constructor(
    public readonly id: string,
    public readonly acceptDate: Date,
  ) {}
}
