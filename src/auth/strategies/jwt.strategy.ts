import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserEntity } from 'src/user/user.entity'

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate({ id }: Pick<UserEntity, 'id'>) {
		return this.userRepository.findBy({ id })
	}
}
