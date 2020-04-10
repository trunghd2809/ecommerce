import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

if (process.env.NODE_ENV === 'test') {
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
  console.log('----Testing in process---');
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
