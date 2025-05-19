import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 값 제거
      forbidNonWhitelisted: true, // 정의되지 않은 값이 들어오면 에러
      transform: true, // class-transformer 적용
    }),
  );

  await app.listen(process.env.port ?? 3010);
}
bootstrap();
