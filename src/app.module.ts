import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/user.model'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/timeline-wall'),
    UsersModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
