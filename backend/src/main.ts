import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  // global endpoints prefix
  app.setGlobalPrefix('api/')
  // handle all user input validation globally
  
  await app.listen(process.env.PORT);
}
bootstrap();
