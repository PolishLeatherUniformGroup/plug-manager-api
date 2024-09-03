import { Logger, Post, Body, Controller } from "@nestjs/common";
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { Apply } from "../dto/requests/apply.request";
import { ApplicantService } from "../services/applicant.service";

@ApiTags("Management")
@Controller("applicants")
export class ApplyController {
    private readonly logger = new Logger(ApplyController.name);
    constructor(private readonly applicantsService: ApplicantService) { }

    @Post()
    @ApiCreatedResponse()
    public async apply(@Body() apply: Apply): Promise<void> {
        await this.applicantsService.apply(apply);
    }
}