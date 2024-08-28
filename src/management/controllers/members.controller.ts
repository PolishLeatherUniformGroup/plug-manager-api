import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ContactData } from '../dto/requests/contact-data.request';
import { MembershipFee } from "../dto/requests/membership-fee";
import { MembershipFeePayment } from "../dto/requests/membership-fee-payment";
import { MemberStatus } from "../domain/member/member-status.enum";
import { Suspension } from "../dto/requests/suspension.request";
import { Appeal } from "../dto/requests/appeal.request";
import { AppealDecision } from "../dto/requests/decision.request";
import { Member as MemberDto } from "../dto/responses/member";
import { MemberService } from "../services/member.service";
import { Expulsion } from "../dto/requests/expulsion.request";
import { YearlyFee } from "../dto/responses/yearly-fee";
import { SuspensionHistory } from "../dto/responses/suspension-history";
import { ExpulsionHistory } from "../dto/responses/expulsion-history";
import { Import } from "../dto/requests/import";

@Controller("members")
@ApiTags("Management")
export class MembersController {

    constructor(private readonly memberService:MemberService) { }

    @Put()
    public async importMembers(@Body() body: Import): Promise<void> {
        await this.memberService.importMembers(body);
    }
    
    @Post(":idOrCard/membership-fees")
    @ApiCreatedResponse()
    public async requestFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFee): Promise<void> {
        await this.memberService.requestFee(idOrCard, body);
    }

    @Put(":idOrCard/membership-fees/:year/payment")
    @ApiAcceptedResponse()
    public async payFee(@Param("idOrCard") idOrCard: string, @Param("year") year: number, @Body() body: MembershipFeePayment): Promise<void> {
        await this.memberService.payFee(idOrCard, year, body);
    }

    @Post(":idOrCard/suspensions")
    @ApiCreatedResponse()
    public async suspend(@Param("idOrCard") idOrCard: string, @Body() body: Suspension): Promise<void> {
        await this.memberService.suspend(idOrCard, body);
    }

    @Put(":idOrCard/suspensions/latest/appeal")
    @ApiAcceptedResponse()
    public async appealSuspension(@Param("idOrCard") idOrCard: string, @Body() body: Appeal): Promise<void> {
       await this.memberService.appealSuspension(idOrCard, body);
    }

    @Put(":idOrCard/suspensions/latest/appeal/decision")
    @ApiAcceptedResponse()
    public async suspensionAppealDecision(@Param("idOrCard") idOrCard: string, @Body() body: AppealDecision): Promise<void> {
        await this.memberService.makeSuspensionAppealDecision(idOrCard, body);
    }

    @Post(":idOrCard/expulsions")
    @ApiCreatedResponse()
    public async expell(@Param("idOrCard") idOrCard: string, @Body() body: Expulsion): Promise<void> {
        await this.memberService.expell(idOrCard, body);
    }

    @Put(":idOrCard/expulsions/latest/appeal")
    @ApiAcceptedResponse()
    public async appealExpell(@Param("idOrCard") idOrCard: string, @Body() body: Appeal): Promise<void> {
        await this.memberService.appealExpell(idOrCard, body);
    }

    @Put(":idOrCard/expulsions/latest/appeal/decision")
    @ApiAcceptedResponse()
    public async explulsionAppealDecision(@Param("idOrCard") idOrCard: string, @Body() body: AppealDecision): Promise<void> {
        await this.memberService.makeExpulsionAppealDecision(idOrCard, body);
    }

    @Put(":idOrCard/contact-data")
    @ApiAcceptedResponse()
    public async updateContactData(@Param("idOrCard") idOrCard: string, @Body() body: ContactData): Promise<void> {
        await this.memberService.updateContactData(idOrCard, body);
    }

    @Get(":idOrCard")
    @ApiOkResponse({ type: MemberDto, isArray: false })
    public async getMember(@Param("idOrCard") idOrCard: string): Promise<MemberDto | null> {
       return await this.memberService.getMember(idOrCard);
    }

    @Get()
    @ApiQuery({ name: "status", enum: MemberStatus, required: false })
    @ApiOkResponse({ type: MemberDto, isArray: true })
    public async getMembers(@Query("status") status: MemberStatus): Promise<MemberDto[]> {
        return await this.memberService.getMembers(status);
    }

    @Get(":idOrCard/membership-fees")
    @ApiOkResponse({ type: YearlyFee, isArray: true })
    public async getMemberFees(@Param("idOrCard") idOrCard: string): Promise<YearlyFee[]> {
        return await this.memberService.getMemberFees(idOrCard);
    }

    @Get(":idOrCard/suspensions")
    @ApiOkResponse({ type: SuspensionHistory, isArray: true })
    public async getMemberSupensions(@Param("idOrCard") idOrCard: string): Promise<SuspensionHistory[]> {
        return await this.memberService.getMemberSuspensions(idOrCard);
    }

    @Get(":idOrCard/expulsions")
    @ApiOkResponse({ type: ExpulsionHistory, isArray: true })
    public async getMemberExpulsion(@Param("idOrCard") idOrCard: string): Promise<ExpulsionHistory[]> {
        return await this.memberService.getMemberExpulsions(idOrCard);
    }
}
