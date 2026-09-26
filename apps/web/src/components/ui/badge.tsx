import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const badgeVariants = tv({
    base: [
        'inline-flex h-6 items-center gap-1.5 rounded-pill px-2.5',
        'whitespace-nowrap border text-xs leading-none font-medium text-text',
    ],
    variants: {
        tone: {
            neutral: 'border-line bg-surface-raised',
            ready: 'border-line bg-surface-raised',
            warning: [
                'border-[color-mix(in_srgb,var(--warning)_22%,transparent)]',
                'bg-[color-mix(in_srgb,var(--warning)_13%,var(--surface))]',
            ],
            info: [
                'border-[color-mix(in_srgb,var(--info)_22%,transparent)]',
                'bg-[color-mix(in_srgb,var(--info)_13%,var(--surface))]',
            ],
            success: [
                'border-[color-mix(in_srgb,var(--success)_22%,transparent)]',
                'bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))]',
            ],
            danger: [
                'border-[color-mix(in_srgb,var(--danger)_22%,transparent)]',
                'bg-[color-mix(in_srgb,var(--danger)_13%,var(--surface))]',
            ],
        },
    },
    defaultVariants: {
        tone: 'neutral',
    },
})

const badgeDotVariants = tv({
    base: 'size-1.5 rounded-full',
    variants: {
        tone: {
            neutral: 'bg-text-muted',
            ready: 'bg-text',
            warning: 'bg-warning',
            info: 'bg-info',
            success: 'bg-success',
            danger: 'bg-danger',
        },
    },
    defaultVariants: {
        tone: 'neutral',
    },
})

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof badgeVariants>

export function Badge({ className, tone, children, ...props }: BadgeProps) {
    return (
        <span
            className={twMerge(badgeVariants({ tone }), className)}
            {...props}
        >
            <span aria-hidden="true" className={badgeDotVariants({ tone })} />
            {children}
        </span>
    )
}
