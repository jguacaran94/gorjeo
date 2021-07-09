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
    return this.postsService.findPost(id || req.body);
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
  @Patch(':postId/comments/:commentId')
  updateComment(@Param('commentId') commentId: ObjectId, @Req() req: Request) {
    return this.postsService.updateComment(commentId, req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId/comments/:commentId')
  removeComment(@Param('commentId') commentId: ObjectId) {
    return this.postsService.removeComment(commentId)
  }
}
