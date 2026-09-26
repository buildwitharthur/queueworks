import { Queue } from 'bullmq'
import { redisConnection } from '../lib/redis.js'

export const CONTACTS_QUEUE_NAME = 'contacts'

export const PROCESS_CONTACTS_JOB_NAME = 'process-contacts'

export type ContactsJobData = {
    fileName: string
    filePath: string
}

export const contactsQueue = new Queue<ContactsJobData>(
    CONTACTS_QUEUE_NAME,
    {
        connection: redisConnection,
    },
)
