import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service'
import { PostsController } from './posts.controller';
import { User, UserSchema } from '../users/user.schema'
import { Post, PostSchema } from './post.schema'
import { CommentSchema } from './comment.schema'

@Module({
  imports: [
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
        name: 'Comment',
        schema: CommentSchema
      }
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    UsersService
  ]
})
export class PostsModule {}
