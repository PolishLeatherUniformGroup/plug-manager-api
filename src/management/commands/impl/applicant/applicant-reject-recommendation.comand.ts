import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantRejectRecommendation implements ICommand {
  constructor(
    public readonly id: string,
    public readonly recommenderIdOrCard,
  ) {}
}
