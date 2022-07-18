import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.enableCors();
  // global endpoints prefix
  app.setGlobalPrefix('api/')
  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe);
  
  
  await app.listen(process.env.PORT);
  logger.log(`Listening to http://localhost:${process.env.PORT}/api`);
}
bootstrap();
