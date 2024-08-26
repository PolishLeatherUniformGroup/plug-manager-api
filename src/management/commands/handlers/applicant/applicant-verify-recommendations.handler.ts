import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantVerifyRecommendations } from "../../impl/applicant/applicant-verify-recommendations";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { ApplicantAggregateRepository } from "../../../domain/applicant/applicant.aggregate-repository";
import { MemberService } from "../../../services/member.service";

@CommandHandler(ApplicantVerifyRecommendations)
export class ApplicantVerifyRecommendationsHandler implements ICommandHandler<ApplicantVerifyRecommendations> {
    constructor(private mempberService: MemberService,
        private readonly applicantRepository: ApplicantAggregateRepository,
        private readonly publisher: StoreEventPublisher

    ) { }

    async execute(command: ApplicantVerifyRecommendations): Promise<any> {
        try {
            const applicant = this.publisher.mergeObjectContext(
                await this.applicantRepository.getById(command.applicantId),
            );

            var allValid = await applicant.recommendations.map(async (recommendation) => {
                return await this.mempberService.exists(recommendation.cardNumber);
            }).filter(async (exists) => !exists).length == 0;
            applicant.validateRecommendations(allValid);
            applicant.commit();

        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}