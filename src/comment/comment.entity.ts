import { Base } from 'src/utils/base.entity'

import { UserEntity } from 'src/user/user.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { VideoEntity } from 'src/video/video.entity'

@Entity('comment')
export class CommentEntity extends Base {
	@Column()
	message: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => VideoEntity, (video) => video.comments)
	@JoinColumn({ name: 'video_id' })
	video: VideoEntity
}
