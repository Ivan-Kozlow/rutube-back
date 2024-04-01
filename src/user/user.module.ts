import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { UserService } from './user.service'
import { AuthService } from 'src/auth/auth.service'

import { VideoEntity } from 'src/video/video.entity'
import { SubscriptionsEntity } from './subscription.entity'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { getJwtConfig } from 'src/config/jwt.config'

@Module({
	controllers: [UserController],
	providers: [ConfigService, UserService, AuthService],
	imports: [
		TypeOrmModule.forFeature([UserEntity, SubscriptionsEntity, VideoEntity]),
		JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: getJwtConfig }),
	],
})
export class UserModule {}
