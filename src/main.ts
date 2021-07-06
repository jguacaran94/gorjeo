import { NestFactory } from '@nestjs/core';
import * as expressListRoutes from 'express-list-routes'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);

  const server = app.getHttpServer()
  const router = server._events.request._router

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.router) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method
          }
        }
      }
    })
    .filter((item) => item !== undefined)

  console.log(availableRoutes)
}
bootstrap();
