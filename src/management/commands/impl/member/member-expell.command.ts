import { ICommand } from "@nestjs/cqrs";

export class MemberExpell implements ICommand {
  constructor(
    public readonly id: string,
    public readonly expellDate: Date,
    public readonly expulsionReason: string,
    public readonly appealDeadline: Date,
  ) {}
}
