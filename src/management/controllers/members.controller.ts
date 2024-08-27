import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ContactData } from '../dto/requests/contact-data.request';
import { MembershipFee } from "../dto/requests/membership-fee";
import { MembershipFeePayment } from "../dto/requests/membership-fee-payment";
import { MemberStatus } from "../domain/member/member-status.enum";
import { Suspension } from "../dto/requests/suspension.request";
import { Appeal } from "../dto/requests/appeal.request";
import { AppealDecision } from "../dto/requests/decision.request";
import { Expulsion } from "../model/members/expulsion.model";


@Controller("members")
@ApiTags("Management")
export class MembersController {

    @Put(":idOrCard/membership-fees")
    public async requestFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFee): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/membership-fees/:year/payment")
    public async payFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFeePayment): Promise<void> {
        throw new Error("Not implemented");
    }

    @Post(":idOrCard/suspensions")
    public async suspend(@Param("idOrCard") idOrCard: string, @Body() body: Suspension): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/suspensions/latest/appeal")
    public async appealSuspension(@Param("idOrCard") idOrCard: string, @Body() body: Appeal): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/suspensions/latest/appeal/decision")
    public async suspensionAppealDecision(@Param("idOrCard") idOrCard: string, @Body() body: AppealDecision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Post(":idOrCard/expulsions")
    public async expell(@Param("idOrCard") idOrCard: string, @Body() body: Expulsion): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/expulsions/latest/appeal")
    public async appealExpell(@Param("idOrCard") idOrCard: string, @Body() body: Appeal): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/expulsions/latest/appeal/decision")
    public async explulsionAppealDecision(@Param("idOrCard") idOrCard: string, @Body() body: AppealDecision): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/contact-data")
    public async updateContactData(@Param("idOrCard") idOrCard: string, @Body() body: ContactData): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get(":idOrCard")
    public async getMember(@Param("idOrCard") idOrCard: string): Promise<void> {
        throw new Error("Not implemented");
    }

    @Get()
    @ApiQuery({ name: "status", enum: MemberStatus, required: false })
    public async getMembers(@Query("status") status: MemberStatus): Promise<void> {
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
