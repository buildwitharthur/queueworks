import { api } from '../lib/api'

type CreateJobResponse = {
    jobId: string
}

export async function createJob(file: File) {
    const formData = new FormData()

    formData.append('file', file)

    const response = await api.post<CreateJobResponse>('/jobs', formData)

    return response.data
}
