import { Controller, Req, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Request } from 'express'
import { ObjectId } from 'mongoose'
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Req() req: Request) {
    return this.usersService.create(req.body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: ObjectId) {
    return this.usersService.findUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Req() req: Request) {
    return this.usersService.update(id, req.body);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}
