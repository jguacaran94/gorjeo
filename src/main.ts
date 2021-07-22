import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'
import { AppModule } from './app.module';

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const configService = app.get(ConfigService)
  app.use(session({
    secret: configService.get(process.env.GORJEO_AUTH_KEY),
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors()
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap();
