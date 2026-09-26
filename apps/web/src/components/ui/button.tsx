import type { ButtonHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const buttonVariants = tv({
    base: [
        'inline-flex items-center justify-center gap-2',
        'h-11 rounded-pill border border-transparent px-5',
        'cursor-pointer whitespace-nowrap text-small font-semibold',
        'transition-colors',
        'disabled:pointer-events-none disabled:cursor-not-allowed',
        'disabled:border-line disabled:bg-surface-raised disabled:text-text-muted',
    ],
    variants: {
        variant: {
            primary: [
                'bg-brand-500 text-on-brand',
                'hover:bg-brand-600',
            ],
            secondary: [
                'bg-surface text-text',
                'border-line font-medium',
                'hover:border-line-strong',
            ],
            ghost: [
                'bg-transparent text-text-muted',
                'hover:bg-surface-raised hover:text-text',
            ],
            icon: [
                'bg-transparent text-text-muted',
                'hover:bg-surface-raised hover:text-text',
            ],
        },
        size: {
            default: '',
            small: 'h-9 px-4 text-sm',
            icon: 'size-8 rounded-md p-0',
        },
        fullWidth: {
            true: 'w-full',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default',
    },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>

export function Button({
    className,
    variant,
    size,
    fullWidth,
    ...props
}: ButtonProps) {
    return (
        <button
            className={twMerge(
                buttonVariants({ variant, size, fullWidth }),
                className,
            )}
            {...props}
        />
    )
}
