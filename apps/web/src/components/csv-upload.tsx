import { useRef, useState } from 'react'
import { FileText, RefreshCw, Upload, X } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from './ui/button'

const MAX_FILE_SIZE = 5 * 1024 * 1024

interface CsvUploadProps {
    file: File | null
    disabled?: boolean
    isSubmitting?: boolean
    onFileChange: (file: File | null) => void
    onSubmit: () => void
}

function formatFileSize(bytes: number) {
    if (bytes < 1024) {
        return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function CsvUpload({
    file,
    disabled = false,
    isSubmitting = false,
    onFileChange,
    onSubmit,
}: CsvUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    function selectFile(nextFile: File | undefined) {
        if (!nextFile || disabled) {
            return
        }

        if (!nextFile.name.toLowerCase().endsWith('.csv')) {
            toast.error('Selecione um arquivo CSV.')
            return
        }

        if (nextFile.size > MAX_FILE_SIZE) {
            toast.error('O arquivo deve ter no máximo 5 MB.')
            return
        }

        onFileChange(nextFile)
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        selectFile(event.target.files?.[0])
        event.target.value = ''
    }

    function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
        event.preventDefault()
        setIsDragging(false)

        if (disabled) {
            return
        }

        selectFile(event.dataTransfer.files[0])
    }

    function handleReplace() {
        if (!disabled) {
            inputRef.current?.click()
        }
    }

    return (
        <section className="flex min-w-0 flex-col border-b border-line p-8 lg:border-r lg:border-b-0">
            <h2 className="text-base leading-6 font-semibold text-text">
                Novo processamento
            </h2>

            <p className="mt-1 text-sm leading-[22px] text-text-muted">
                O arquivo deve seguir o formato{' '}
                <code className="rounded-sm border border-line bg-surface-raised px-1.5 py-0.5 text-[13px] text-text">
                    name,email,company
                </code>
            </p>

            <p className="mt-1 text-sm leading-[22px] text-text-muted">
                Máximo 5 MB
            </p>

            <div className="mt-5 flex flex-1 flex-col">
                {file ? (
                    <div className="flex min-h-[196px] items-start gap-3 rounded-xl border border-line bg-surface p-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-text">
                            <FileText size={20} strokeWidth={1.5} />
                        </span>

                        <div className="min-w-0 flex-1 pt-0.5">
                            <p className="truncate text-[15px] font-semibold text-text">
                                {file.name}
                            </p>
                            <p className="mt-0.5 font-mono text-xs text-text-muted">
                                {formatFileSize(file.size)}
                            </p>
                        </div>

                        <div className="flex shrink-0 gap-0.5">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Trocar arquivo"
                                title="Trocar arquivo"
                                disabled={disabled}
                                onClick={handleReplace}
                            >
                                <RefreshCw size={18} strokeWidth={1.5} />
                            </Button>
                            <Button
                                variant="icon"
                                size="icon"
                                aria-label="Remover arquivo"
                                title="Remover arquivo"
                                disabled={disabled}
                                onClick={() => onFileChange(null)}
                            >
                                <X size={18} strokeWidth={1.5} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <label
                        htmlFor="csv-file"
                        className={`flex min-h-[196px] flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border-[1.5px] border-dashed bg-bg px-6 py-8 text-center transition-colors ${
                            disabled
                                ? 'pointer-events-none opacity-60'
                                : isDragging
                                  ? 'border-brand-600 bg-brand-500/5'
                                  : 'border-line-strong hover:border-text-muted'
                        }`}
                        onDragEnter={(event) => {
                            event.preventDefault()
                            if (!disabled) setIsDragging(true)
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        <span className="mb-3 flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-text">
                            <Upload size={20} strokeWidth={1.5} />
                        </span>
                        <span className="text-[15px] font-medium text-text">
                            Arraste seu CSV aqui
                        </span>
                        <span className="text-[13px] text-text-muted">ou</span>
                        <span className="text-sm font-medium text-accent-text underline decoration-1 underline-offset-4">
                            Clique para selecionar
                        </span>
                    </label>
                )}

                <input
                    id="csv-file"
                    ref={inputRef}
                    type="file"
                    accept=".csv,text/csv"
                    className="sr-only"
                    disabled={disabled}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mt-6">
                <Button
                    fullWidth
                    disabled={!file || disabled}
                    onClick={onSubmit}
                >
                    {isSubmitting ? 'Enviando...' : 'Processar arquivo'}
                </Button>
            </div>
        </section>
    )
}
