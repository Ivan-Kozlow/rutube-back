import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { VideoEntity } from './video.entity'
import { VideoDto } from './video.dto'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoEntity)
		private readonly videosRepository: Repository<VideoEntity>,
	) {}

	async byId(id: VideoEntity['id'], isPublic = false) {
		const video = await this.videosRepository.findOne({
			where: isPublic ? { id, isPublic: true } : { id },
			relations: { user: true, comments: { user: true } },
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscribersCount: true,
					subscriptions: true,
				},
				comments: {
					id: true,
					message: true,
					user: { id: true, name: true, avatarPath: true, isVerified: true, subscribersCount: true },
				},
			},
		})
		if (!video) throw new NotFoundException('Видео не найдено!')
		return video
	}

	async update(id: VideoEntity['id'], dto: VideoDto) {
		const video = await this.byId(id)
		return this.videosRepository.save({ ...video, ...dto })
	}

	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<VideoEntity> = {}

		if (searchTerm) options = { name: ILike(`%${searchTerm}%`) }
		return this.videosRepository.find({
			where: { ...options, isPublic: true },
			order: { createdAt: 'DESC' },
			select: { user: { id: true, name: true, avatarPath: true, isVerified: true } },
		})
	}

	async getMostPopularByViews() {
		return this.videosRepository.find({
			where: { views: MoreThan(0), isPublic: true },
			order: { views: -1 },
			select: { user: { id: true, name: true, avatarPath: true, isVerified: true } },
		})
	}

	async create(userId: number) {
		const defaultValues = {
			name: '',
			user: { id: userId },
			videoPath: '',
			description: '',
			thumbnailPath: '',
		}

		const newVideo = this.videosRepository.create(defaultValues)
		const video = await this.videosRepository.save(newVideo)
		return video.id
	}

	async delete(id: VideoEntity['id']) {
		return this.videosRepository.delete({ id })
	}

	async incrementViews(id: VideoEntity['id']) {
		const video = await this.byId(id)
		video.views++
		return this.videosRepository.save(video)
	}

	async incrementLikes(id: VideoEntity['id']) {
		const video = await this.byId(id)
		video.likes++
		return this.videosRepository.save(video)
	}
}
