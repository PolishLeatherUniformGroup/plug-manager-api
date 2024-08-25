import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [ManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
