import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());

  const option = new DocumentBuilder()
    .setTitle('FoodRiend')
    .setDescription('FoodRiend-API')
    .setVersion('1.0.0')
    .build();

  const documents = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('/docs', app, documents);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3006);
}
bootstrap();
