import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function saveUploadFile(
    buffer: Buffer,
    jobId: string,
) {
    const uploadsDirectory = path.resolve('storage/uploads')

    await mkdir(uploadsDirectory, {
        recursive: true,
    })

    const filePath = path.join(
        uploadsDirectory,
        `${jobId}.csv`,
    )

    await writeFile(filePath, buffer)

    return filePath
}
