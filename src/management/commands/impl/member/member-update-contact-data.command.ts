import { ICommand } from "@ocoda/event-sourcing";
import { Address } from "../../../dto/address.dto";

export class MemberUpdateContactData implements ICommand {
  constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly phone?: string,
    public readonly address?: Address,
  ) { }
}
