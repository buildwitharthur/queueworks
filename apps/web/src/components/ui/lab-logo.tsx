import type { ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type LabLogoProps = ImgHTMLAttributes<HTMLImageElement>

export function LabLogo({
    className,
    alt = 'ArthurLabs Lab',
    ...props
}: LabLogoProps) {
    return (
        <img
            src="/assets/lab-logo.svg"
            alt={alt}
            className={twMerge('block size-6 object-contain', className)}
            draggable={false}
            {...props}
        />
    )
}
