import { Repository } from 'typeorm'
import { genSalt, hash } from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { UserEntity } from './user.entity'
import { UserDto } from './user.dto'
import { SubscriptionsEntity } from './subscription.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(SubscriptionsEntity)
		private readonly subscriptionsRepository: Repository<SubscriptionsEntity>,
	) {}

	async byId(id: UserEntity['id']) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: { videos: true, subscriptions: { toChannel: true } },
			order: { createdAt: 'DESC' },
		})
		if (!user) throw new NotFoundException('Пользователь не найден!')
		return user
	}

	async update(id: UserEntity['id'], dto: UserDto) {
		const user = await this.byId(id)
		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && id !== isSameUser.id) throw new NotFoundException('Пользователь с таким email уже существует!')

		if (dto.password) {
			const salt = await genSalt(7)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.description = dto.description
		user.avatarPath = dto.avatarPath
		user.name = dto.name

		return await this.userRepository.save(user)
	}

	async subscribe(id: UserEntity['id'], channelId: number) {
		const data = {
			toChannel: { id: channelId },
			fromUser: { id },
		}

		const isSubscribed = await this.subscriptionsRepository.findOneBy(data)
		if (!isSubscribed) {
			const newSubscription = this.subscriptionsRepository.create(data)
			await this.subscriptionsRepository.save(newSubscription)
			return true
		}

		await this.subscriptionsRepository.delete(data)
		return false
	}

	async getAll() {
		return await this.userRepository.find()
	}
}
