import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT, () =>
    logger.log(
      `API vehicles running on port ${process.env.PORT} | env: ${process.env.NODE_ENV} `,
    ),
  );
}
bootstrap();