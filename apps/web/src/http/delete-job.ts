import { api } from '../lib/api'

export async function deleteJob(id: string) {
    await api.delete(`/jobs/${id}`)
}
