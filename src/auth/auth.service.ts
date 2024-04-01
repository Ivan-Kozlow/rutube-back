import { Repository } from 'typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { UserEntity } from 'src/user/user.entity'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id),
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })
		if (oldUser) throw new BadRequestException('Пользователь с таким email уже существует!')

		const salt = await genSalt(7)
		const newUser = await this.userRepository.create({ email: dto.email, password: await hash(dto.password, salt) })
		const user = await this.userRepository.save(newUser)

		return { user: this.returnUserFields(user), token: await this.issueAccessToken(user.id) }
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userRepository.findOne({
			where: { email: dto.email },
			select: ['id', 'email', 'password'],
		})

		if (!user) throw new NotFoundException('Пользователь не найден!')
		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль!')

		return user
	}

	async issueAccessToken(userId: UserEntity['id']) {
		const data = { id: userId }
		const token = await this.jwtService.signAsync(data)
		return token
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email,
		}
	}
}
