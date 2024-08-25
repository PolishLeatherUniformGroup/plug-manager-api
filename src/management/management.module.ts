import { Module } from '@nestjs/common';
import { ManagementController } from './controllers/management.controller';
import { ManagementService } from './services/management.service';

@Module({
  controllers: [ManagementController],
  providers: [ManagementService]
})
export class ManagementModule { }
