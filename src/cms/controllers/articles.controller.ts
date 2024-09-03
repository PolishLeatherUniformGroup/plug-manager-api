import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('articles')
@ApiTags('CMS')
export class ArticlesController { }


