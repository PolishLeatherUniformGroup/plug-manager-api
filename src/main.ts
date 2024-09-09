import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from 'dotenv';
import { otelSDK } from "./tracing";


const envconfig = dotenv.config({ path: ['.env', '.env.local'] });

async function bootstrap() {
  //otelSDK.start();
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose', 'log'],
  });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('PLUG API')
    .setDescription('The PLUG API')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `${envconfig.parsed.AUTH0_ISSUER_URL}authorize?audience=${envconfig.parsed.AUTH0_AUDIENCE}`,
            tokenUrl: `${envconfig.parsed.AUTH0_ISSUER_URL}`,
            scopes: {
              openid: 'Open Id',
              profile: 'Profile',
              email: 'E-mail',
            },
          },
        },
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('openapi', app, document, {
    swaggerOptions: {
      oauth: {
        // this will pre-fill the client id in the Swagger authorization form
        clientId: `${envconfig.parsed.AUTHO_OAUTH_CLIENT_ID}`,
        rediretUrl: `${envconfig.parsed.AUTH0_REDIRECT_URL}`,
      },
    }
  });

  await app.listen(3001);
}
bootstrap();
