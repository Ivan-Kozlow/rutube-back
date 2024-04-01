import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { CommentService } from './comment.service'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/user.decorator'
import { CommentDto } from './comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	async createComment(@CurrentUser('id') id: number, @Body() dto: CommentDto) {
		return this.commentService.create(id, dto)
	}
}
