import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Apply } from "../dto/requests/apply.request";
import { ApplicantService } from "../services/applicant.service";
import { RecommendationDecision } from "../dto/requests/recommendation-decision.request";
import { ApplicationFee } from "../dto/requests/application-fee.request";
import { AppealDecision, Decision } from "../dto/requests/decision.request";
import { Appeal } from "../dto/requests/appeal.request";
import { ApplicantStatus } from "../domain/applicant/applicant-status.enum";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller("applicants")
@ApiTags("Management")
export class ApplicantsController {

    constructor(private readonly applicantsService: ApplicantService) { }

    @Post()
    public async apply(@Body() apply: Apply): Promise<void> {
        await this.applicantsService.apply(apply);
    }

    @Put(":id/recommendation/:idOrCard/decision")
    public async makeRecommendationDecision(
        @Param("id") id: string,
        @Param("recommender") idOrCard: string,
        @Body() decision: RecommendationDecision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":id/fee")
    public async payApplicationFee(@Param("id") id: string, @Body() fee: ApplicationFee): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":id/decision")
    public async makeDecision(@Param("id") id: string, @Body() decision: Decision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":id/appeal")
    public async appealDecision(@Param("id") id: string, @Body() appeal: Appeal): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":id/appeal/decision")
    public async makeAppealDecision(@Param("id") id: string, @Body() decision: AppealDecision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get(":id")
    public async getApplicant(@Param("id") id: string): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get()
    @ApiQuery({ name: 'status', enum: ApplicantStatus, required: false })
    public async getApplicants(@Query("status") status?: ApplicantStatus): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get(":id/status")
    public async getApplicantStatus(@Param("id") id: string): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get("/recommendations/:card")
    public async getRecommendations(@Param("card") card: string): Promise<void> {
        throw new Error("Not implemented");
    }

}
