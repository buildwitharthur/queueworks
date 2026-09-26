import { Router } from 'express'

import { contactsQueue } from '../queue/contacts-queue.js'

export const getJobResultRouter = Router()

getJobResultRouter.get('/jobs/:id/result', async (request, response) => {
    const { id } = request.params

    const job = await contactsQueue.getJob(id)

    if (!job) {
        return response.status(404).json({
            message: 'Job não encontrado.',
        })
    }

    const state = await job.getState()

    if (state !== 'completed') {
        return response.status(409).json({
            message: 'O resultado ainda não está disponível.',
        })
    }

    const outputPath = job.returnvalue?.outputPath

    if (!outputPath) {
        return response.status(404).json({
            message: 'Arquivo de resultado não encontrado.',
        })
    }

    const originalName = job.data.fileName.replace(/\.csv$/i, '')
    const downloadName = `${originalName}-result.csv`

    return response.download(outputPath, downloadName)
})
