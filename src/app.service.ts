import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service'
import { PostsService } from './posts/posts.service'
import { Comment } from './posts/comment.schema'

@Injectable()
export class AppService {
  // private users: User[] = []
  // private posts: Post[] = []
  // private comments: Comment[] = []

  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  getHome(): any {
    return this.postsService.findAllPosts()
  }
}
