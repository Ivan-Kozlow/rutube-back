import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { VideoService } from './video.service'

import { VideoEntity } from './video.entity'
import { VideoController } from './video.controller'
import { CommentEntity } from 'src/comment/comment.entity'

@Module({
	controllers: [VideoController],
	providers: [VideoService],
	imports: [TypeOrmModule.forFeature([VideoEntity, CommentEntity])],
})
export class VideoModule {}
