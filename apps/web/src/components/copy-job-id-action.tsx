import { toast } from 'sonner'

import { DropdownMenuItem } from './ui/dropdown-menu'

interface CopyJobIdActionProps {
    jobId: string
}

export function CopyJobIdAction({ jobId }: CopyJobIdActionProps) {
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(jobId)

            toast.success('ID copiado.')
        } catch {
            toast.error('Não foi possível copiar o ID.')
        }
    }

    return (
        <DropdownMenuItem onSelect={handleCopy}>
            Copiar ID do job
        </DropdownMenuItem>
    )
}
