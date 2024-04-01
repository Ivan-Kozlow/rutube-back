import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'

import { getJwtConfig } from 'src/config/jwt.config'
import { UserEntity } from 'src/user/user.entity'
import { AuthController } from './auth.controller'
import { JWTStrategy } from './strategies/jwt.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JWTStrategy],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		TypeOrmModule.forFeature([UserEntity]),
	],
})
export class AuthModule {}
