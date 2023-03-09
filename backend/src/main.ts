import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.POSTGRES_USERNAME);
  console.log(process.env.POSTGRES_PASSWORD);
  console.log(process.env.POSTGRES_DATABASE);
  console.log(process.env.POSTGRES_HOST);
  console.log(process.env.POSTGRES_SYNCHRONIZE);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
