import { ICommand } from "@nestjs/cqrs";

export class ApplicantApproveRecommendation implements ICommand {
  constructor(
    public readonly id: string,
    public readonly recommenderIdOrCard,
  ) {}
}
