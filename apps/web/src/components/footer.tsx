import { LabLogo } from './ui/lab-logo'

export function Footer() {
    return (
        <footer className="flex justify-center py-12">
            <a
                href="https://arthurlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] leading-5 text-text-muted opacity-75 transition-opacity hover:opacity-100"
            >
                <LabLogo className="size-4" />

                <span>
                    um experimento{' '}
                    <strong className="font-semibold">ArthurLabs</strong>
                </span>
            </a>
        </footer>
    )
}
