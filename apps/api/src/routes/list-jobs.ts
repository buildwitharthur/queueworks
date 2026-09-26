import { Router } from 'express'

import { contactsQueue } from '../queue/contacts-queue.js'

export const listJobsRouter = Router()

listJobsRouter.get('/jobs', async (_request, response) => {
    const jobs = await contactsQueue.getJobs(
        [
            'waiting',
            'active',
            'delayed',
            'completed',
            'failed',
        ],
        0,
        19,
        false,
    )

    const result = await Promise.all(
        jobs.map(async (job) => {
            const state = await job.getState()

            return {
                id: job.id,
                fileName: job.data.fileName,
                state,
                progress: job.progress,
                createdAt: new Date(job.timestamp).toISOString(),
            }
        }),
    )

    result.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
    )

    return response.status(200).json({
        jobs: result,
    })
})
