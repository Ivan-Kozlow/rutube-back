import { Base } from 'src/utils/base.entity'

import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('subscriptions')
export abstract class SubscriptionsEntity extends Base {
	@ManyToOne(() => UserEntity, (user) => user.subscriptions)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, (user) => user.subscribers)
	@JoinColumn({ name: 'to_channel_id' })
	toChannel: UserEntity
}
