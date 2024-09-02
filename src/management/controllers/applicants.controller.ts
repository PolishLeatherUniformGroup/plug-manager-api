import { Body, Controller, Get, Logger, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Apply } from "../dto/requests/apply.request";
import { ApplicantService } from "../services/applicant.service";
import { RecommendationDecision } from "../dto/requests/recommendation-decision.request";
import { ApplicationFee } from "../dto/requests/application-fee.request";
import { AppealDecision, Decision } from "../dto/requests/decision.request";
import { Appeal } from "../dto/requests/appeal.request";
import { ApplicantStatus } from "../domain/applicant/applicant-status.enum";
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Applicant as ApplicantDto } from "../dto/responses/applicant.response";
import { ApplicantRecommendation } from "../dto/responses/applicant-recommendation";
import { ApplicationStatus } from "../dto/responses/application-status";
import { AuthGuard } from '@nestjs/passport';
import { Auth0Guard } from "../../auth0.guard";

@Controller("applicants")
@ApiTags("Management")

export class ApplicantsController {
    private readonly logger = new Logger(ApplicantsController.name);
    constructor(private readonly applicantsService: ApplicantService) { }

    @Post()
    @ApiCreatedResponse()
    public async apply(@Body() apply: Apply): Promise<void> {
        await this.applicantsService.apply(apply);
    }

    @Put(":id/recommendation/:idOrCard/decision")
    @ApiAcceptedResponse()
    @UseGuards(AuthGuard('jwt'))
    public async makeRecommendationDecision(
        @Param("id") id: string,
        @Param("idOrCard") idOrCard: string,
        @Body() decision: RecommendationDecision): Promise<void> {
        await this.applicantsService.recommend(id, idOrCard, decision);
    }

    @Put(":id/fee")
    @ApiAcceptedResponse()
    @UseGuards(AuthGuard('jwt'))
    public async payApplicationFee(@Param("id") id: string, @Body() fee: ApplicationFee): Promise<void> {
        await this.applicantsService.registerFeePayment(id, fee);
    }

    @Put(":id/decision")
    @UseGuards(AuthGuard('jwt'))
    @ApiAcceptedResponse()
    public async makeDecision(@Param("id") id: string, @Body() decision: Decision): Promise<void> {
        await this.applicantsService.makeDecision(id, decision);
    }

    @Put(":id/appeal")
    @UseGuards(AuthGuard('jwt'))
    @ApiAcceptedResponse()
    public async appealDecision(@Param("id") id: string, @Body() appeal: Appeal): Promise<void> {
        await this.applicantsService.appealDecision(id, appeal);
    }

    @Put(":id/appeal/decision")
    @ApiAcceptedResponse()
    @UseGuards(AuthGuard('jwt'))
    public async makeAppealDecision(@Param("id") id: string, @Body() decision: AppealDecision): Promise<void> {
        await this.applicantsService.makeAppealDecision(id, decision);
    }

    @Get(":id")
    @ApiOkResponse({ type: ApplicantDto, isArray: false })
    @UseGuards(AuthGuard('jwt'))
    public async getApplicant(@Param("id") id: string): Promise<ApplicantDto | undefined> {
        this.logger.log(`Getting applicant with id: ${id}`);
        const applicant = await this.applicantsService.get(id);
        return applicant;
    }

    @Get()
    @ApiQuery({ name: 'status', enum: ApplicantStatus, required: false })
    @ApiOkResponse({ type: ApplicantDto, isArray: true })
    @UseGuards(Auth0Guard)
    public async getApplicants(@Query("status") status?: ApplicantStatus): Promise<ApplicantDto[]> {
        return
    }

    @Get(":id/status")
    @ApiOkResponse({ type: ApplicationStatus, isArray: true })
    @UseGuards(AuthGuard('jwt'))
    public async getApplicantStatus(@Param("id") id: string): Promise<ApplicationStatus[]> {
        return await this.applicantsService.getApplicationStatus(id);
    }

    @Get("/recommendations/:card")
    @ApiOkResponse({ type: ApplicantRecommendation, isArray: true })
    @UseGuards(AuthGuard('jwt'))
    public async getRecommendations(@Param("card") card: string): Promise<ApplicantRecommendation[]> {
        return await this.applicantsService.getApplicantsAwaitingRecommendations(card);
    }

}
