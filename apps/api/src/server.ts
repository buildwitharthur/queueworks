import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: process.env.WEB_URL,
        credentials: true,
    }),
)

app.get('/health', (_request, response) => {
    return response.status(200).json({
        status: 'ok',
        service: 'queueworks-api',
    })
})

const port = Number(process.env.PORT) || 3333

app.listen(port, '0.0.0.0', () => {
    console.log(`QueueWorks API running on port ${port}`)
})
