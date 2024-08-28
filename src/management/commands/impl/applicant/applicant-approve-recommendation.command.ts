import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantApproveRecommendation implements ICommand {
  constructor(
    public readonly id: string,
    public readonly recommenderIdOrCard,
  ) {}
}
