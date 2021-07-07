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
  create(@Req() req: Request) {
    return this.postsService.create(req.body);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.findPost(id || req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.postsService.update(id, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.postsService.remove(id);
  }
}
