import { Base } from 'src/utils/base.entity'

import { VideoEntity } from 'src/video/video.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { SubscriptionsEntity } from './subscription.entity'

@Entity('user')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@Column({ default: 0, name: 'subscribers_count' })
	subscribersCount: number

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@OneToMany(() => VideoEntity, (video) => video.user)
	videos: VideoEntity[]

	@OneToMany(() => SubscriptionsEntity, (subscription) => subscription.fromUser)
	subscriptions: SubscriptionsEntity[]

	@OneToMany(() => SubscriptionsEntity, (subscription) => subscription.toChannel)
	subscribers: SubscriptionsEntity[]
}
