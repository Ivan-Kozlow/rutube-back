import { VideoModule } from './video/video.module'
import { UserModule } from './user/user.module'
import { getTypeOrmConfig } from './config/typeorm.config'
import { CommentModule } from './comment/comment.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { AppService } from './app.service'

import { AppController } from './app.controller'
import { MediaModule } from './media/media.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig,
		}),
		UserModule,
		AuthModule,
		CommentModule,
		VideoModule,
		MediaModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
