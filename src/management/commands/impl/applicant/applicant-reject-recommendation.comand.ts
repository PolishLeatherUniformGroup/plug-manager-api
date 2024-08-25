import { ICommand } from "@nestjs/cqrs";

export class ApplicantRejectRecommendation implements ICommand {
    constructor(public readonly id: string, public readonly recommenderIdOrCard) { }
}