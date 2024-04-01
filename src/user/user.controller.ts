import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserService } from './user.service'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from './user.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Get('by-id/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@Get()
	async getUsers() {
		return this.userService.getAll()
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(+id, dto)
	}

	@HttpCode(200)
	@Patch('subscribe/:channelId')
	@Auth()
	async subscribe(@CurrentUser('id') id: number, @Param('channelId') channelId: string) {
		return this.userService.subscribe(id, +channelId)
	}
}
