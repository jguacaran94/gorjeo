import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service'
import { PostsController } from './posts.controller';
import { PostSchema } from './post.schema'
import { CommentSchema } from './comment.schema'
import { UserSchema } from '../users/user.schema'

@Module({
  imports: [
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
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    UsersService
  ]
})
export class PostsModule {}
