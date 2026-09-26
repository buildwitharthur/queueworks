import { useSuspenseQuery } from '@tanstack/react-query'

import { listJobs } from '../http/list-jobs'
import { Badge } from './ui/badge'
import { JobActions } from './job-actions'

const statusConfig = {
    waiting: {
        label: 'Na fila',
        tone: 'warning',
    },
    delayed: {
        label: 'Na fila',
        tone: 'warning',
    },
    active: {
        label: 'Processando',
        tone: 'info',
    },
    completed: {
        label: 'Concluído',
        tone: 'success',
    },
    failed: {
        label: 'Falhou',
        tone: 'danger',
    },
} as const

export function JobsTable() {
    const { data } = useSuspenseQuery({
        queryKey: ['jobs'],
        queryFn: listJobs,
        refetchInterval: 1500,
    })

    const jobs = data.jobs

    return (
        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[580px] border-collapse text-sm leading-5">
                <thead>
                    <tr className="border-b border-line">
                        <th className="px-5 py-3 text-left text-xs font-medium text-text-muted">
                            Arquivo
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-text-muted">
                            Status
                        </th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-text-muted">
                            Linhas
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-text-muted">
                            Criado em
                        </th>
                        <th className="w-14 px-3 py-3">
                            <span className="sr-only">Ações</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-5 py-7 text-sm leading-[22px] text-text-muted"
                            >
                                Nenhum job processado ainda.
                            </td>
                        </tr>
                    ) : (
                        jobs.map((job) => {
                            const status = statusConfig[job.state]
                            const rows =
                                typeof job.progress === 'object'
                                    ? job.progress.metrics.received
                                    : 0
                            const createdAt = new Date(
                                job.createdAt,
                            ).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })

                            return (
                                <tr
                                    key={job.id}
                                    className="border-b border-line transition-colors last:border-b-0 hover:bg-surface-raised/50"
                                >
                                    <td className="max-w-0 truncate px-5 py-3 font-medium text-text">
                                        {job.fileName}
                                    </td>

                                    <td className="px-5 py-3">
                                        <Badge tone={status.tone}>
                                            {status.label}
                                        </Badge>
                                    </td>

                                    <td className="px-5 py-3 text-right tabular-nums text-text">
                                        {rows.toLocaleString('pt-BR')}
                                    </td>

                                    <td className="px-5 py-3 font-mono text-[13px] text-text-muted">
                                        {createdAt}
                                    </td>

                                    <td className="w-14 px-3 py-3 text-right">
                                        <JobActions jobId={job.id} />
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}
