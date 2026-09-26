import { randomUUID } from 'node:crypto'

import { Router } from 'express'
import { z } from 'zod'

import { upload } from '../lib/multer.js'
import {
    contactsQueue,
    PROCESS_CONTACTS_JOB_NAME,
} from '../queue/contacts-queue.js'
import { saveUploadFile } from '../utils/save-upload-file.js'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const csvFileSchema = z
    .object({
        originalname: z.string().min(1),
        mimetype: z.string(),
        size: z.number().positive(),
        buffer: z.instanceof(Buffer),
    })
    .refine((file) => file.originalname.toLowerCase().endsWith('.csv'), {
        message: 'O arquivo deve ser um CSV.',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: 'O arquivo deve ter no máximo 5 MB.',
    })
    .refine((file) => file.buffer.length > 0, {
        message: 'O arquivo está vazio.',
    })

const csvContentSchema = z
    .string()
    .trim()
    .min(1, 'O arquivo está vazio.')
    .refine(
        (content) => {
            const [header] = content.split(/\r?\n/)

            return header?.trim() === 'name,email,company'
        },
        {
            message: 'O cabeçalho deve ser name,email,company.',
        },
    )

export const createJobRouter = Router()

createJobRouter.post(
    '/jobs',
    upload.single('file'),
    async (request, response) => {
        const fileResult = csvFileSchema.safeParse(request.file)

        if (!fileResult.success) {
            return response.status(400).json({
                message: fileResult.error.issues[0]?.message,
            })
        }

        const file = fileResult.data
        const content = file.buffer.toString('utf8').replace(/^\uFEFF/, '')
        const contentResult = csvContentSchema.safeParse(content)

        if (!contentResult.success) {
            return response.status(400).json({
                message: contentResult.error.issues[0]?.message,
            })
        }

        const jobId = `qw_${randomUUID()}`
        const filePath = await saveUploadFile(file.buffer, jobId)

        await contactsQueue.add(
            PROCESS_CONTACTS_JOB_NAME,
            {
                fileName: file.originalname,
                filePath,
            },
            {
                jobId,
            },
        )

        return response.status(202).json({
            jobId,
        })
    },
)
