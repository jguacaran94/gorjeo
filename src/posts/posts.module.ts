import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service'
import { PostsController } from './posts.controller';
import { User, UserSchema } from '../users/user.schema'
import { Post, PostSchema } from './post.schema'
import { Comment, CommentSchema } from './comment.schema'
import { Like, LikeSchema } from './like.schema'
import { Repost, RepostSchema } from './repost.schema'

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
    ])
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    UsersService
  ]
})
export class PostsModule {}
