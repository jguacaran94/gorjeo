import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { User } from './user.schema'


@Injectable()
export class UsersService {
  private users: User[] = []

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async create(params: User) {
    if (!params.name || !params.username || !params.email || !params.password) {
      return {
        message: 'Name, username, email and password are required!'
      }
    }
    const passwordPlain = params.password
    const passwordHash = await bcrypt.hash(passwordPlain, 10)
    const setUser = new this.userModel({
      name: params.name,
      username: params.username,
      email: params.email,
      password: passwordHash
    })
    const user = await this.userModel.findOne({ name: params.name } && { username: params.username } && { email: params.email })
    if (user) {
      return user.id
    }
    const result = await setUser.save()
    return {
      message: `User ${params.username} created successfully!`,
      result
    }
  }

  async findAll() {
    const users = await this.userModel.find().exec()
    return users as User[]
  }

  async findUser(id?: ObjectId, username?: string) {
    let user
    if (id) {
      user = await this.findUserById(id)
    }
    if (username) {
      user = await this.userModel.findOne({ username: username })
    }
    return user
  }

  async update(id: ObjectId, params: User, post?: any, comment?: any) {
    const user = await this.findUserById(id)
    Object.assign(user, params)
    user.updatedAt = Date.now()
    if (post) user.posts.push(post)
    if (comment) user.comments.push(comment)
    const result = await user.save()
    return {
      message: `User ${params.username} updated successfully!`,
      result
    }
  }

  async remove(id: ObjectId) {
    const user = await this.findUserById(id)
    const toDelete = await this.userModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) {
      throw new NotFoundException('Could not find user.')
    }
    return {
      message: `User ${user.username} deleted successfully!`
    }
  }

  private async findUserById(id: ObjectId) {
    let user
    try {
      user = await this.userModel.findById(id).exec()
    } catch(error) {
      throw new NotFoundException('Could not find user.')
    }
    if (!user) {
      throw new NotFoundException('Could not find user.')
    }
    return user
  }
}
