import { Base } from 'src/utils/base.entity'

import { UserEntity } from 'src/user/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CommentEntity } from 'src/comment/comment.entity'

@Entity('video')
export class VideoEntity extends Base {
	@Column()
	name: string

	@Column({ default: false, name: 'is_public' })
	isPublic: boolean

	@Column({ default: 0 })
	views?: number

	@Column({ default: 0 })
	likes?: number

	@Column({ default: 0 })
	duration?: number

	@Column({ default: '', type: 'text' })
	description?: string

	@Column({ default: '', name: 'video_path' })
	videoPath: string

	@Column({ default: '', name: 'thumbnail_path' })
	thumbnailPath: string

	@ManyToOne(() => UserEntity, (user) => user.videos)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => CommentEntity, (comment) => comment.video)
	comments: CommentEntity[]
}
