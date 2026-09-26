import { api } from '../lib/api'

export async function getJobResult(id: string) {
    const response = await api.get<Blob>(`/jobs/${id}/result`, {
        responseType: 'blob',
    })

    return response.data
}
