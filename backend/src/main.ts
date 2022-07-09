import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // global endpoints prefix
  app.setGlobalPrefix('api/')
  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe);
  
  await app.listen(process.env.PORT);
  console.log(`Listening on http://localhost:${process.env.PORT}/api`)
}
bootstrap();
