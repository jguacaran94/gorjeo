import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(undefined, username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  public async signUp(params: any) {
    const hashPassword = await bcrypt.hash(params.password, 10)
    params.password = hashPassword
    try {
      return this.usersService.create(params)
    } catch(err) {
      throw new HttpException(`Something went wrong! Error: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async signIn(params: any) {
    try {
      const userData = params.email || params.username
      const user = await this.usersService.findUser(undefined, userData)
      await this.verifyPassword(params.password, user.password)
      return user
    } catch(err) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }

  private async verifyPassword(plainPassword: string, hashPassword: string) {
    const matchPassword = await bcrypt.compare(plainPassword, hashPassword)
    if (!matchPassword) throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
  }
}
