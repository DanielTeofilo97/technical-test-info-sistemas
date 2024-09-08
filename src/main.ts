import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LogHttpInterceptor } from './interceptors/log.interceptor';


const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Vehicles')
    .setDescription('API REST desenvolvido com NestJs e PostgreSQL')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('vehicles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogHttpInterceptor());

  await app.listen(process.env.PORT, () =>
    logger.log(
      `API vehicles running on port ${process.env.PORT} | env: ${process.env.NODE_ENV} `,
    ),
  );
}
bootstrap();