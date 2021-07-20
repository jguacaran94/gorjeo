import { Controller, Req, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { ObjectId } from 'mongoose'
import { LocalAuthGuard } from '../auth/local-auth.guard'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Req() req: Request) {
    return this.postsService.createPost(req.body);
  }

  @Get()
  findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findPost(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.findPost(id, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.updatePost(id, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removePost(@Param('id') id: ObjectId) {
    return this.postsService.removePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  createComment(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.createComment(id, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/comments/:commentId')
  updateComment(@Param('commentId') commentId: ObjectId, @Req() req: Request) {
    return this.postsService.updateComment(commentId, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/comments/:commentId')
  removeComment(@Param('commentId') commentId: ObjectId) {
    return this.postsService.removeComment(commentId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like_post')
  likePost(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.likePost(id, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/total_post_likes')
  totalPostLikes(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.totalPostLikes(id, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/unlike/:postLikeId')
  unlikePost(@Param('postLikeId') postLikeId: ObjectId) {
    return this.postsService.unlike(postLikeId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/comments/:commentId/like_comment')
  likeComment(@Param('commentId') commentId: ObjectId, @Req() req: Request) {
    return this.postsService.likeComment(commentId, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/comments/:commentId/total_comment_likes')
  totalCommentLikes(@Param('commentId') commentId: ObjectId, @Req() req: Request) {
    return this.postsService.totalCommentLikes(commentId, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/comments/:commentId/unlike/:commentLikeId')
  unlikeComment(@Param('commentLikeId') commentLikeId: ObjectId) {
    return this.postsService.unlike(commentLikeId)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/repost')
  createRepost(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.repost(id, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/repost/:repostId')
  unrepost(@Param('repostId') repostId: ObjectId) {
    return this.postsService.unrepost(repostId)
  }
}
