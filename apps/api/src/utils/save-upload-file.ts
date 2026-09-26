import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

type StorageDirectory = 'uploads' | 'results'

export async function saveCsvFile(
    content: Buffer | string,
    id: string,
    directory: StorageDirectory,
) {
    const storageDirectory = path.resolve(
        'storage',
        directory,
    )

    await mkdir(storageDirectory, {
        recursive: true,
    })

    const filePath = path.join(
        storageDirectory,
        `${id}.csv`,
    )

    await writeFile(filePath, content)

    return filePath
}
