import { ICommand } from "@nestjs/cqrs";

export class ApplicantVerifyRecommendations implements ICommand {
  constructor(public readonly applicantId: string) {}
}
