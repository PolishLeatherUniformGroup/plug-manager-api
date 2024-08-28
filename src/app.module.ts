import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementModule } from "./management/management.module";

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
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
