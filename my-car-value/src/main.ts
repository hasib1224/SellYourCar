import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');
const cookieParser= require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   cookieSession({
  //     keys: ['hasib'],
  //   }),
  // );
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allow non-null values
    }),
  );
  await app.listen(3000);
}
bootstrap();
