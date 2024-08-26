import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ContactData } from '../dto/requests/contact-data.request';
import { MembershipFee } from "../dto/requests/membership-fee";
import { MembershipFeePayment } from "../dto/requests/membership-fee-payment";
import { MemberStatus } from "../domain/member/member-status.enum";


@Controller("members")
@ApiTags("Management")
export class MembersController {

    @Put(":idOrCard/membership-fee")
    public async requestFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFee): Promise<void> {
        throw new Error("Not implemented");
    }

    @Put(":idOrCard/membership-fee/:year/payment")
    public async payFee(@Param("idOrCard") idOrCard: string, @Body() body: MembershipFeePayment): Promise<void> {
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
}
