import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const contentVariants = tv({
    base: [
        'z-20 min-w-[200px] rounded-[12px] border border-line',
        'bg-surface p-1.5 outline-none',
        'shadow-[0_8px_24px_rgba(3,5,4,0.1)]',
    ],
})

const itemVariants = tv({
    base: [
        'flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5',
        'border-0 bg-transparent text-left text-sm font-medium text-text',
        'outline-none transition-colors',
        'hover:bg-surface-raised',
        'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed',
        'data-[disabled]:text-text-muted',
    ],
    variants: {
        variant: {
            default: '',
            danger: 'text-[#B4233A] hover:bg-danger/10 dark:text-[#FF8A98]',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

type DropdownMenuContentProps = ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Content
>

export const DropdownMenuContent = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
>(({ className, sideOffset = 6, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={twMerge(contentVariants(), className)}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

type DropdownMenuItemProps = ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Item
> & VariantProps<typeof itemVariants>

export const DropdownMenuItem = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, variant, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={twMerge(itemVariants({ variant }), className)}
        {...props}
    />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export const DropdownMenuSeparator = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
        ref={ref}
        className={twMerge('mx-1 my-1.5 h-px bg-line', className)}
        {...props}
    />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName
