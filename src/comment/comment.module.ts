import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CommentService } from './comment.service'

import { CommentEntity } from './comment.entity'
import { CommentController } from './comment.controller'

@Module({
	controllers: [CommentController],
	providers: [CommentService],
	imports: [TypeOrmModule.forFeature([CommentEntity])],
})
export class CommentModule {}
