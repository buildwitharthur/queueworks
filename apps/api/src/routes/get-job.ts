import { Router } from 'express'

import { contactsQueue } from '../queue/contacts-queue.js'

export const getJobRouter = Router()

getJobRouter.get('/jobs/:id', async (request, response) => {
    const { id } = request.params

    const job = await contactsQueue.getJob(id)

    if (!job) {
        return response.status(404).json({
            message: 'Job não encontrado.',
        })
    }

    const state = await job.getState()

    return response.status(200).json({
        id: job.id,
        fileName: job.data.fileName,
        state,
        progress: job.progress,
    })
})
