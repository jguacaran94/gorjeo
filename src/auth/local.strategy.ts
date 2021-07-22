import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super()
  }

  async validate(params: any): Promise<any> {
    const user = await this.authService.signIn(params)
    if (!user) {
      throw new UnauthorizedException
    }
    return user
  }
}