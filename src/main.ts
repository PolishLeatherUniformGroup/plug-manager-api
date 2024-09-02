import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose', 'log'],
  });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('PLUG API')
    .setDescription('The PLUG API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('openapi', app, document);

  await app.listen(3001);
}
bootstrap();
