import { ICommand } from "@nestjs/cqrs";

export class MemberAcceptExpulsionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly acceptDate: Date,
  ) {}
}
