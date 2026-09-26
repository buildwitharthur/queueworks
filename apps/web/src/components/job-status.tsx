import { Download } from 'lucide-react'

import type { Job } from '../types'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ProgressBar } from './ui/progress-bar'

interface JobStatusProps {
    job?: Job
    isLoading?: boolean
    isDownloading?: boolean
    onDownload: () => void
}

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

export function JobStatus({
    job,
    isLoading = false,
    isDownloading = false,
    onDownload,
}: JobStatusProps) {
    const progress =
        typeof job?.progress === 'object'
            ? job.progress.percentage
            : job?.progress ?? 0

    const metrics =
        typeof job?.progress === 'object'
            ? job.progress.metrics
            : {
                  received: 0,
                  valid: 0,
                  invalid: 0,
                  duplicates: 0,
              }

    const status = job
        ? statusConfig[job.state]
        : { label: 'Aguardando', tone: 'neutral' as const }

    const fileName = isLoading
        ? 'Carregando status...'
        : job?.fileName ?? 'Nenhum arquivo em processamento'

    const statusMessage =
        job?.state === 'waiting'
            ? 'Aguardando um worker disponível.'
            : job?.state === 'delayed'
              ? 'Aguardando processamento.'
              : job?.state === 'active'
                ? 'Processando arquivo.'
                : job?.state === 'completed'
                  ? 'Resultado pronto para download.'
                  : job?.state === 'failed'
                    ? 'O processamento falhou.'
                    : ''

    const metricItems = [
        ['Recebidos', metrics.received],
        ['Válidos', metrics.valid],
        ['Inválidos', metrics.invalid],
        ['Duplicados', metrics.duplicates],
    ] as const

    return (
        <section className="flex min-w-0 flex-col p-8">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-base leading-6 font-semibold text-text">
                    Status atual
                </h2>
                {job ? (
                    <span className="font-mono text-[11px] leading-4 text-text-muted">
                        Job {job.id}
                    </span>
                ) : null}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
                <p
                    className={`min-w-0 truncate text-[17px] leading-[26px] ${job ? 'font-semibold text-text' : 'font-normal text-text-muted'}`}
                    title={job?.fileName}
                >
                    {fileName}
                </p>
                <Badge tone={status.tone}>{status.label}</Badge>
            </div>

            <p className="mt-0.5 min-h-6 text-sm leading-[22px] text-text-muted">
                {statusMessage}
            </p>

            <div className="mt-5">
                <ProgressBar
                    value={progress}
                    tone={job?.state === 'failed' ? 'danger' : 'default'}
                />
                <div className="mt-2 text-right font-mono text-[11px] leading-4 text-text">
                    {progress}%
                </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 overflow-hidden rounded-lg border border-line sm:grid-cols-4">
                {metricItems.map(([label, value], index) => (
                    <div
                        key={label}
                        className={`min-w-0 p-3 ${index % 2 === 1 ? 'border-l border-line' : ''} ${index >= 2 ? 'border-t border-line sm:border-t-0' : ''} ${index > 0 ? 'sm:border-l' : 'sm:border-l-0'}`}
                    >
                        <dt className="text-xs text-text-muted">{label}</dt>
                        <dd className="mt-0.5 text-[22px] leading-[30px] font-semibold tabular-nums text-text">
                            {value.toLocaleString('pt-BR')}
                        </dd>
                    </div>
                ))}
            </dl>

            <div className="mt-auto pt-6">
                <Button
                    fullWidth
                    variant="secondary"
                    disabled={job?.state !== 'completed' || isDownloading}
                    onClick={onDownload}
                >
                    <Download size={18} strokeWidth={1.5} />
                    {isDownloading ? 'Baixando...' : 'Baixar resultado'}
                </Button>
            </div>
        </section>
    )
}
