import { Module } from "@nestjs/common";
import { ManagementModule } from "./management/management.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventSourcingModule } from "event-sourcing-nestjs";

@Module({
  imports: [
    ManagementModule,
    ScheduleModule.forRoot(),
    EventSourcingModule.forRoot({ mongoURL: 'mongodb://localhost:27017' }),
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
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
