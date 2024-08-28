import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantVerifyRecommendations implements ICommand {
  constructor(public readonly id: string) {}
}
