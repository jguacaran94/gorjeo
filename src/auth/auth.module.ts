import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { UserSchema } from '../users/user.model'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { JwtConstants } from './jwt-constants'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
