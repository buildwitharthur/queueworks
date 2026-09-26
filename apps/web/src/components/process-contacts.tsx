import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createJob } from '../http/create-job'
import { getJob } from '../http/get-job'
import { getJobResult } from '../http/get-job-result'
import { Button } from './ui/button'
import { CsvUpload } from './csv-upload'
import { JobStatus } from './job-status'

export function ProcessContacts() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [currentJobId, setCurrentJobId] = useState<string | null>(null)

    const createJobMutation = useMutation({
        mutationFn: createJob,

        onSuccess: ({ jobId }) => {
            setCurrentJobId(jobId)
        },

        onError: (error) => {
            toast.error(
                typeof error === 'string'
                    ? error
                    : 'Não foi possível criar o job.',
            )
        },
    })

    const jobQuery = useQuery({
        queryKey: ['job', currentJobId],
        queryFn: () => getJob(currentJobId!),
        enabled: Boolean(currentJobId),
        refetchInterval: (query) => {
            const job = query.state.data

            if (!job) {
                return 1500
            }

            if (job.state === 'completed' || job.state === 'failed') {
                return false
            }

            return 1500
        },
    })

    const downloadResultMutation = useMutation({
        mutationFn: getJobResult,

        onSuccess: (blob) => {
            const job = jobQuery.data

            if (!job) {
                return
            }

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.download = `${job.fileName.replace(/\.csv$/i, '')}-result.csv`
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)
        },

        onError: (error) => {
            toast.error(
                typeof error === 'string'
                    ? error
                    : 'Não foi possível baixar o resultado.',
            )
        },
    })

    const isJobActive =
        jobQuery.data?.state === 'waiting' ||
        jobQuery.data?.state === 'active' ||
        jobQuery.data?.state === 'delayed'

    const isBusy = createJobMutation.isPending || isJobActive

    function handleSubmit() {
        if (!selectedFile) {
            return
        }

        createJobMutation.mutate(selectedFile)
    }

    function handleLoadExample() {
        const content = [
            'name,email,company',
            'Ana Silva,ana@empresa.com,Empresa A',
            'Bruno Souza,bruno@empresa.com,Empresa B',
            'Carla Lima,carla@empresa.com,Empresa C',
        ].join('\n')

        const file = new File([content], 'contacts.csv', {
            type: 'text/csv',
        })

        setSelectedFile(file)
    }

    function handleDownload() {
        const job = jobQuery.data

        if (!job || job.state !== 'completed') {
            return
        }

        downloadResultMutation.mutate(job.id)
    }

    return (
        <section>
            <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                    <h1 className="text-title font-semibold text-text">
                        Processar contatos
                    </h1>
                    <p className="mt-1 text-[15px] leading-6 text-text-muted">
                        Envie um arquivo CSV e acompanhe o processamento.
                    </p>
                </div>

                <Button
                    variant="secondary"
                    size="small"
                    disabled={isBusy}
                    onClick={handleLoadExample}
                >
                    Carregar exemplo
                </Button>
            </div>

            <div className="grid overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-2">
                <CsvUpload
                    file={selectedFile}
                    disabled={isBusy}
                    isSubmitting={createJobMutation.isPending}
                    onFileChange={setSelectedFile}
                    onSubmit={handleSubmit}
                />

                <JobStatus
                    job={jobQuery.data}
                    isLoading={Boolean(currentJobId) && jobQuery.isPending}
                    isDownloading={downloadResultMutation.isPending}
                    onDownload={handleDownload}
                />
            </div>
        </section>
    )
}
