import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailService } from './email.service';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtppro.zoho.eu',
        port: Number('587'),
        secure: true,
        auth: {
          user: 'tomasz.molis@plug.org.pl',
          pass: 'd!Zujocaci2212',
        },
      },
      defaults: {
        from: '"PLUG" <board@plug.org.pl>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService]

})
export class MailingModule { }
