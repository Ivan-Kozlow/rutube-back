import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'

import { VideoService } from './video.service'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/user.decorator'
import { VideoDto } from './video.dto'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('get-private/:id')
	@Auth()
	async getVideoPrivate(@Param('id') id: string) {
		return this.videoService.byId(+id, true)
	}

	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.videoService.byId(+id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@Post()
	@HttpCode(200)
	@Auth()
	async createVideo(@CurrentUser() id: number) {
		return this.videoService.create(id)
	}

	@Post(':id')
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
		return this.videoService.update(+id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.videoService.delete(+id)
	}

	@Put('update-views/:videoId')
	@HttpCode(200)
	async incrementViews(@Param('videoId') videoId: string) {
		return this.videoService.incrementViews(+videoId)
	}

	@Put('update-likes/:videoId')
	@HttpCode(200)
	async incrementLikes(@Param('videoId') videoId: string) {
		return this.videoService.incrementLikes(+videoId)
	}
}
