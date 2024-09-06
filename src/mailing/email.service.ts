import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    private async sendEmail(recipient: string, subject: string, data: any, template: string) {
        await this.mailerService.sendMail({
            to: recipient,
            subject: subject,
            template: template,
            context: data,
        });
    }

    public async sendMembershipStartEmail(email: string, firstName: string) {
        const data = {
            name: firstName
        };
        await this.sendEmail(email, "Witamy w sotwarzyszeniu", data, 'application-accepted');
    }
}
