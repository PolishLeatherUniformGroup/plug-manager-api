import { Module, OnModuleInit } from "@nestjs/common";
import { Events as ManagementEvents, ManagementModule } from "./management/management.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventSourcingModule, EventStore } from "@ocoda/event-sourcing";

@Module({
  imports: [
    ManagementModule,
    ScheduleModule.forRoot(),
    EventSourcingModule.forRoot({
      eventStore:{
        client: 'mongodb',
        options: {
          url: 'mongodb://localhost:27017/evets',
        },
      },
      events: [...ManagementEvents],
    }),
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
export class AppModule  implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}
  onModuleInit(): any {
    this.eventStore.setup();
  }
}
