import { rm } from 'node:fs/promises'

import { Router } from 'express'

import { contactsQueue } from '../queue/contacts-queue.js'

export const deleteJobRouter = Router()

deleteJobRouter.delete('/jobs/:id', async (request, response) => {
    const { id } = request.params

    const job = await contactsQueue.getJob(id)

    if (!job) {
        return response.status(404).json({
            message: 'Job não encontrado.',
        })
    }

    const state = await job.getState()

    if (state === 'active') {
        return response.status(409).json({
            message: 'Não é possível remover um job em processamento.',
        })
    }

    await rm(job.data.filePath, {
        force: true,
    })

    const outputPath = job.returnvalue?.outputPath

    if (outputPath) {
        await rm(outputPath, {
            force: true,
        })
    }

    await job.remove()

    return response.status(204).send()
})
