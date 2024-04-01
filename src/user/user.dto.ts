import { IsEmail, IsString } from 'class-validator'

export class UserDto {
	@IsString()
	name: string

	password?: string

	@IsEmail()
	email: string

	@IsString()
	description: string

	@IsString()
	avatarPath: string
}
