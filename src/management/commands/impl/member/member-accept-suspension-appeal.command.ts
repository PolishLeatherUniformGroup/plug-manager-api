import { ICommand } from "@nestjs/cqrs";

export class MemberAcceptSuspensionAppeal implements ICommand {
  constructor(
    public readonly id: string,
    public readonly acceptDate: Date,
  ) {}
}
