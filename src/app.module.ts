import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementModule } from "./management/management.module";
import { MailingModule } from './mailing/mailing.module';
import { CommunityModule } from './community/community.module';
import { EventingModule } from './eventing/eventing.module';
import { BlogModule } from './blog/blog.module';
import { StoreModule } from './store/store.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from "./config/typeorm";
import { DataSource } from "typeorm";
import { AppLoggerMiddleware } from "./app-logger";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = await configService.get('typeorm');
        return config;
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },

    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ManagementModule,
    MailingModule,
    CommunityModule,
    EventingModule,
    BlogModule,
    StoreModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
