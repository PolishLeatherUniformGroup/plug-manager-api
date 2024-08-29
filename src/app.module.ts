import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementModule } from "./management/management.module";
import { MailingModule } from './mailing/mailing.module';
import { CommunityModule } from './community/community.module';
import { EventingModule } from './eventing/eventing.module';
import { BlogModule } from './blog/blog.module';
import { StoreModule } from './store/store.module';
import { SettingsController } from './management/controllers/settings.controller';

@Module({
  imports: [
    ManagementModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 7001,
      username: "root",
      password: "password",
      database: "plug_api",
      entities: [
        "dist/**/*.model{.ts,.js}"
      ],
      synchronize: true,
      logger: 'advanced-console',
      verboseRetryLog: true,
      dropSchema: true,
    }),
    MailingModule,
    CommunityModule,
    EventingModule,
    BlogModule,
    StoreModule,
  ],
  providers: [],
})
export class AppModule { }
