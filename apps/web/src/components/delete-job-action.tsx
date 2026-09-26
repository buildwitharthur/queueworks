import { Trash2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteJob } from '../http/delete-job'
import { DropdownMenuItem } from './ui/dropdown-menu'

interface DeleteJobActionProps {
    jobId: string
}

export function DeleteJobAction({ jobId }: DeleteJobActionProps) {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteJob,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['jobs'],
            })

            toast.success('Job removido.')
        },

        onError: (error) => {
            toast.error(
                typeof error === 'string'
                    ? error
                    : 'Não foi possível remover o job.',
            )
        },
    })

    function handleDelete() {
        deleteMutation.mutate(jobId)
    }

    return (
        <DropdownMenuItem
            variant="danger"
            disabled={deleteMutation.isPending}
            onSelect={handleDelete}
        >
            <Trash2 size={18} strokeWidth={1.5} />
            {deleteMutation.isPending
                ? 'Removendo...'
                : 'Remover do histórico'}
        </DropdownMenuItem>
    )
}
