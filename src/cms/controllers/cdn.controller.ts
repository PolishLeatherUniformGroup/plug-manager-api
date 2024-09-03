import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('cdn')
@ApiTags('CDN')
export class CdnController {}


