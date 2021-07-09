import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service'
import { UserSchema } from './users/user.schema'
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service'
import { PostSchema } from './posts/post.schema'
import { CommentSchema } from './posts/comment.schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/timeline-wall'),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name: 'Post',
        schema: PostSchema
      },
      {
        name: 'Comment',
        schema: CommentSchema
      }
    ]),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    UsersService,
    PostsService
  ],
})
export class AppModule {}
