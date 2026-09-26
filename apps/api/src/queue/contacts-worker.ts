import { Worker } from 'bullmq'

import { redisConnection } from '../lib/redis.js'
import { CONTACTS_QUEUE_NAME } from './contacts-queue.js'
import { processContacts } from './process-contacts.js'

export function startContactsWorker() {
    return new Worker(CONTACTS_QUEUE_NAME, processContacts, {
        connection: redisConnection,
    })
}
