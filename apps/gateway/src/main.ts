import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ← 중요!
      whitelist: true,
    }),
  );

  await app.listen(process.env.port ?? 3030);
}
bootstrap();
