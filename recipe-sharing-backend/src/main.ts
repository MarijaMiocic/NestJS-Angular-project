import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Učitaj .env datoteku
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);  // Postavi port iz .env ili koristi 3000 kao default
}
bootstrap();
