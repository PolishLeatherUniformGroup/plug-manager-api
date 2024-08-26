import { ICommand } from "@nestjs/cqrs";

export class MemberRejectExpulsionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly rejectDate: Date,
    public readonly justification: string,
  ) {}
}
