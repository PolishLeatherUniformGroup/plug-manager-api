import { Module } from "@nestjs/common";
import { ManagementModule } from "./management/management.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ManagementModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
