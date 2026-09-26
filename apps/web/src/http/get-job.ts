import { api } from '../lib/api'
import type { Job } from '../types'

export async function getJob(id: string) {
    const response = await api.get<Job>(`/jobs/${id}`)

    return response.data
}
