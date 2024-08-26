import { Body, Controller, Post } from "@nestjs/common";
import { Apply } from "../dto/requests/apply.request";
import { ApplicantService } from "../services/applicant.service";

@Controller("applicants")
export class ApplicantsController {

    constructor(private readonly applicantsService: ApplicantService) { }

    @Post()
    public async apply(@Body() apply: Apply): Promise<void> {
        await this.applicantsService.apply(apply);
    }

}
