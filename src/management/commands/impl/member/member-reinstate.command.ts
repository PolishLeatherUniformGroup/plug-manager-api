import { ICommand } from "@nestjs/cqrs";

export class MemberReinstate implements ICommand {
  constructor(public readonly id: string) {}
}
