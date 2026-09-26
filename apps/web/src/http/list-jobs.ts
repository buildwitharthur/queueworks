import { api } from '../lib/api'
import type { Job } from '../types'

export type ListJob = Job & {
    createdAt: string
}

type ListJobsResponse = {
    jobs: ListJob[]
}

export async function listJobs() {
    const response = await api.get<ListJobsResponse>('/jobs')

    return response.data
}
