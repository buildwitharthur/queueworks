import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const progressFillVariants = tv({
    base: 'h-full rounded-pill transition-[width,background-color] duration-300 ease-out',
    variants: {
        tone: {
            default: 'bg-brand-500',
            danger: 'bg-danger',
            info: 'bg-info',
        },
    },
    defaultVariants: {
        tone: 'default',
    },
})

interface ProgressBarProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof progressFillVariants> {
    value: number
}

export function ProgressBar({
    value,
    tone,
    className,
    ...props
}: ProgressBarProps) {
    const progress = Math.min(100, Math.max(0, value))

    return (
        <div
            className={twMerge(
                'h-1.5 w-full overflow-hidden rounded-pill bg-[#E4EAE5] dark:bg-line',
                className,
            )}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            {...props}
        >
            <div
                className={progressFillVariants({ tone })}
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
