import { LabLogo } from './ui/lab-logo'

export function Header() {
    return (
        <header className="border-b border-line">
            <div className="mx-auto flex h-16 w-full max-w-[1040px] items-center px-6">
                <div className="flex items-center gap-2.5">
                    <LabLogo className="size-6" />

                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-text">
                        QueueWorks
                    </span>
                </div>
            </div>
        </header>
    )
}
