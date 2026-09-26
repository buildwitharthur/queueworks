import type { Job } from 'bullmq'

export async function processContactsJob(job: Job) {
    console.log(job)
}
