import { Ellipsis } from 'lucide-react'

import { CopyJobIdAction } from './copy-job-id-action'
import { DeleteJobAction } from './delete-job-action'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface JobActionsProps {
    jobId: string
}

export function JobActions({ jobId }: JobActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="icon" size="icon" aria-label="Ações do job">
                    <Ellipsis size={18} strokeWidth={1.5} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <CopyJobIdAction jobId={jobId} />

                <DropdownMenuSeparator />

                <DeleteJobAction jobId={jobId} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
