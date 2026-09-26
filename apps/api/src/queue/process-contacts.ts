import type { Job } from 'bullmq'

import type { ContactsJobData } from './contacts-queue.js'

export async function processContacts(
    job: Job<ContactsJobData>,
) {
    console.log(job.data)
}
