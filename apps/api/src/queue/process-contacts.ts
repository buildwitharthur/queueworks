import type { Job } from 'bullmq'
import { parse } from 'csv-parse/sync'
import { readFile } from 'node:fs/promises'
import { z } from 'zod'

import type { ContactsJobData } from './contacts-queue.js'
import { saveCsvFile } from '../utils/save-upload-file.js'

type ContactRow = {
    name?: string
    email?: string
    company?: string
}

type JobMetrics = {
    received: number
    valid: number
    invalid: number
    duplicates: number
}

const NAME_PARTICLES = new Set(['da', 'de', 'do', 'das', 'dos', 'e'])

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1)
        .transform((value) =>
            value
                .split(/\s+/)
                .map((word, index) => {
                    const normalizedWord = word.toLowerCase()

                    if (index > 0 && NAME_PARTICLES.has(normalizedWord)) {
                        return normalizedWord
                    }

                    return (
                        normalizedWord.charAt(0).toUpperCase() +
                        normalizedWord.slice(1)
                    )
                })
                .join(' '),
        ),

    email: z.string().trim().toLowerCase().email(),

    company: z
        .string()
        .trim()
        .optional()
        .default('')
        .transform((value) => value.replace(/\s+/g, ' ')),
})

type Contact = z.infer<typeof contactSchema>

function escapeCsvValue(value: string) {
    if (!/[",\r\n]/.test(value)) {
        return value
    }

    return `"${value.replace(/"/g, '""')}"`
}

export async function processContacts(job: Job<ContactsJobData>) {
    const content = (await readFile(job.data.filePath, 'utf8')).replace(
        /^\uFEFF/,
        '',
    )
    const rows = parse(content, {
        columns: true,
        skip_empty_lines: true,
    }) as ContactRow[]

    const metrics: JobMetrics = {
        received: rows.length,
        valid: 0,
        invalid: 0,
        duplicates: 0,
    }
    const seenEmails = new Set<string>()

    const validContacts: Contact[] = []

    let processedRows = 0
    let lastPercentage = -1

    const totalRows = rows.length

    await job.updateProgress({
        percentage: 0,
        metrics,
    })
    lastPercentage = 0

    for (const row of rows) {
        const result = contactSchema.safeParse(row)

        if (!result.success) {
            metrics.invalid++
        } else {
            const contact = result.data

            if (seenEmails.has(contact.email)) {
                metrics.duplicates++
            } else {
                seenEmails.add(contact.email)
                metrics.valid++
                validContacts.push(contact)
            }
        }

        processedRows++

        const percentage =
            totalRows === 0
                ? 99
                : Math.min(99, Math.floor((processedRows / totalRows) * 100))

        if (percentage !== lastPercentage) {
            await job.updateProgress({
                percentage,
                metrics: {
                    received: metrics.received,
                    valid: metrics.valid,
                    invalid: metrics.invalid,
                    duplicates: metrics.duplicates,
                },
            })
            lastPercentage = percentage
        }
    }

    const output = [
        'name,email,company',
        ...validContacts.map((contact) =>
            [
                escapeCsvValue(contact.name),
                escapeCsvValue(contact.email),
                escapeCsvValue(contact.company),
            ].join(','),
        ),
    ].join('\n')

    if (!job.id) {
        throw new Error('O job precisa possuir um ID.')
    }

    const outputPath = await saveCsvFile(output, job.id, 'results')

    if (lastPercentage !== 100) {
        await job.updateProgress({
            percentage: 100,
            metrics: {
                received: metrics.received,
                valid: metrics.valid,
                invalid: metrics.invalid,
                duplicates: metrics.duplicates,
            },
        })
    }

    return {
        outputPath,
        metrics,
    }
}
