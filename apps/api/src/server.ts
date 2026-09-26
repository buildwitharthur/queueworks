import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import { errorHandler } from './middlewares/error-handler.js'

import { createJobRouter } from './routes/create-job.js'
import { startContactsWorker } from './queue/contacts-worker.js'

const app = express()

app.use(
    cors({
        origin: process.env.WEB_URL,
        credentials: true,
    }),
)

app.use(express.json())

app.get('/health', (_request, response) => {
    return response.status(200).json({
        status: 'ok',
        service: 'queueworks-api',
    })
})

app.use(createJobRouter)

app.use(errorHandler)

await startContactsWorker()

const port = Number(process.env.PORT) || 3333

app.listen(port, '0.0.0.0', () => {
    console.log(`QueueWorks API running on port ${port}`)
})
