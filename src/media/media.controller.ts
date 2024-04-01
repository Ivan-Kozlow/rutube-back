import { FileInterceptor } from '@nestjs/platform-express'
import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'

import { MediaService } from './media.service'

import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post()
	@Auth()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('media'))
	async uploadMediaFile(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string) {
		return this.mediaService.saveMedia(file, folder)
	}
}
