import { ICommand } from "@ocoda/event-sourcing";
import { Address } from "../../../domain/address.value-object";

export class MemberCreate implements ICommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly birthDate: Date,
    public readonly applyDate: Date,
    public readonly address: Address,
    public readonly joinDate: Date,
    public readonly paid: number,
    public readonly phone?: string,
  ) {}
}
