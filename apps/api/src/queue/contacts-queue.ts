import { Queue } from 'bullmq'
import { redisConnection } from '../lib/redis.js'

export const CONTACTS_QUEUE_NAME = 'contacts'

export const contactsQueue = new Queue(CONTACTS_QUEUE_NAME, {
    connection: redisConnection,
})
