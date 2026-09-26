import { Router } from 'express'
import { z } from 'zod'

import { contactsQueue } from '../queue/contacts-queue.js'

const paramsSchema = z.object({
    id: z.string().min(1),
})

const progressSchema = z.object({
    percentage: z.number(),
    metrics: z.object({
        received: z.number(),
        valid: z.number(),
        invalid: z.number(),
        duplicates: z.number(),
    }),
})

const emptyProgress = {
    percentage: 0,
    metrics: {
        received: 0,
        valid: 0,
        invalid: 0,
        duplicates: 0,
    },
}

function normalizeJobStatus(state: string) {
    switch (state) {
        case 'active':
            return 'processing'

        case 'completed':
            return 'completed'

        case 'failed':
            return 'failed'

        case 'waiting':
        case 'delayed':
        case 'prioritized':
        case 'paused':
        default:
            return 'waiting'
    }
}

export const getJobRouter = Router()

getJobRouter.get('/jobs/:id', async (request, response) => {
    const paramsResult = paramsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'ID do job inválido.',
        })
    }

    const { id } = paramsResult.data
    const job = await contactsQueue.getJob(id)

    if (!job) {
        return response.status(404).json({
            message: 'Job não encontrado.',
        })
    }

    const state = await job.getState()

    const status = normalizeJobStatus(state)

    const progressResult = progressSchema.safeParse(job.progress)

    const progress = progressResult.success
        ? progressResult.data
        : emptyProgress

    const result = {
        id: job.id,
        fileName: job.data.fileName,
        status,
        progress,
        ...(status === 'failed'
            ? {
                  error: job.failedReason || 'O processamento falhou.',
              }
            : {}),
    }

    return response.status(200).json(result)
})
