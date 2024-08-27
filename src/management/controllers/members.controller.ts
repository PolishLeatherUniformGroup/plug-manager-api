import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ContactData } from '../dto/requests/contact-data.request';
import { MembershipFee } from "../dto/requests/membership-fee";
import { MembershipFeePayment } from "../dto/requests/membership-fee-payment";
import { MemberStatus } from "../domain/member/member-status.enum";
import { Suspension } from "../dto/requests/suspension.request";
import { Appeal } from "../dto/requests/appeal.request";
import { AppealDecision } from "../dto/requests/decision.request";
import { Expulsion } from "../model/members/expulsion.model";
import { Member as MemberDto } from "../dto/responses/member";
import { MemberService } from "../services/member.service";

@Controller("members")
@ApiTags("Management")
export class MembersController {

    constructor(private readonly memberService:MemberService) { }

    @Post(":idOrCard/membership-fees")
    @ApiCreatedResponse()
    public async requestFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFee): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/membership-fees/:year/payment")
    @ApiAcceptedResponse()
    public async payFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFeePayment): Promise<void> {
        throw new Error("Not implemented");
    }

    @Post(":idOrCard/suspensions")
    @ApiCreatedResponse()
    public async suspend(@Param("idOrCard") idOrCard: string, @Body() body: Suspension): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/suspensions/latest/appeal")
    @ApiAcceptedResponse()
    public async appealSuspension(@Param("idOrCard") idOrCard: string, @Body() body: Appeal): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/suspensions/latest/appeal/decision")
    @ApiAcceptedResponse()
    public async suspensionAppealDecision(@Param("idOrCard") idOrCard: string, @Body() body: AppealDecision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Post(":idOrCard/expulsions")
    @ApiCreatedResponse()
    public async expell(@Param("idOrCard") idOrCard: string, @Body() body: Expulsion): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/expulsions/latest/appeal")
    @ApiAcceptedResponse()
    public async appealExpell(@Param("idOrCard") idOrCard: string, @Body() body: Appeal): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/expulsions/latest/appeal/decision")
    @ApiAcceptedResponse()
    public async explulsionAppealDecision(@Param("idOrCard") idOrCard: string, @Body() body: AppealDecision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/contact-data")
    @ApiAcceptedResponse()
    public async updateContactData(@Param("idOrCard") idOrCard: string, @Body() body: ContactData): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get(":idOrCard")
    @ApiOkResponse({ type: MemberDto, isArray: false })
    public async getMember(@Param("idOrCard") idOrCard: string): Promise<MemberDto> {
        throw new Error("Not implemented");
    }

    @Get()
    @ApiQuery({ name: "status", enum: MemberStatus, required: false })
    @ApiOkResponse({ type: MemberDto, isArray: true })
    public async getMembers(@Query("status") status: MemberStatus): Promise<MemberDto[]> {
        throw new Error("Not implemented");
    }

    @Get(":idOrCard/membership-fees")
    public async getMemberFees(@Param("idOrCard") idOrCard: string): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get(":idOrCard/history")
    public async getMemberHistory(@Param("idOrCard") idOrCard: string): Promise<void> {
        throw new Error("Not implemented");
    }
}
