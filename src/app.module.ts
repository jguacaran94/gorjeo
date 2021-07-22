import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import secretsKey from './config/secrets_key'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service'
import { User, UserSchema } from './users/user.schema'
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service'
import { Post, PostSchema } from './posts/post.schema'
import { Comment, CommentSchema } from './posts/comment.schema'
import { Like, LikeSchema } from './posts/like.schema'
import { Repost, RepostSchema } from './posts/repost.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [secretsKey] 
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/gorjeo'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Post.name,
        schema: PostSchema
      },
      {
        name: Comment.name,
        schema: CommentSchema
      },
      {
        name: Like.name,
        schema: LikeSchema
      },
      {
        name: Repost.name,
        schema: RepostSchema
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
