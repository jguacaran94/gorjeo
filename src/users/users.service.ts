import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { User, UserDocument } from './user.schema'


@Injectable()
export class UsersService {
  private users: User[] = []

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(params: User) {
    if (!params.name || !params.username || !params.email || !params.password) {
      return {
        message: 'Name, username, email and password are required!'
      }
    }
    const user = await this.userModel.findOne({ username: params.username, email: params.email })
    if (user) return {
      message: `The username ${user.username} or email ${user.email} has been taken! Please, try with another.`
    }
    const setUser = new this.userModel({
      name: params.name,
      username: params.username,
      email: params.email,
      password: params.password
    })
    const result = await setUser.save()
    return {
      message: `User ${setUser.username} created successfully!`,
      result
    }
  }

  async findAll() {
    const users = await this.userModel.find().exec()
    return users as User[]
  }

  async findUser(id?: ObjectId, params?: any) {
    let user
    if (id) user = await this.findUserById(id)
    if (params) user = await this.userModel.findOne({ username: params.username, email: params.email })
    return user
  }

  async update(id: ObjectId, params?: User, post?: any, comment?: any, like?: any) {
    const user = await this.findUserById(id)
    Object.assign(user, params)
    const result = await user.save()
    return {
      message: `User ${user.username} updated successfully!`,
      result
    }
  }

  async remove(id: ObjectId) {
    const user = await this.findUserById(id)
    const toDelete = await this.userModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) throw new NotFoundException('Could not find user.')
    return {
      message: `User ${user.username} deleted successfully!`
    }
  }

  private async findUserById(id: ObjectId) {
    let user
    try {
      user = await this.userModel.findById(id).exec()
    } catch(error) {
      throw new NotFoundException(`Could not find user, because: ${error}`)
    }
    if (!user) throw new NotFoundException(`Could not find user, because user is ${user}`)
    return user
  }
}
