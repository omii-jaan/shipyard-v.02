import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-[var(--radius-badge)]',
    'text-[var(--text-micro)] font-medium',
    'transition-[color,background-color,border-color]',
    'duration-[var(--duration-fast)] ease-[var(--ease-default)]',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-transparent',
          'bg-[var(--primary-500)] text-[var(--text-inverse)]',
          'hover:bg-[var(--primary-600)]',
        ],
        secondary: [
          'border-transparent',
          'bg-[var(--bg-surface-2)] text-[var(--text-primary)]',
          'hover:bg-[var(--bg-active)]',
        ],
        destructive: [
          'border-transparent',
          'bg-[var(--error-500)] text-[var(--text-inverse)]',
          'hover:bg-[var(--error-600)]',
          'focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--error-500)]',
        ],
        outline: [
          'border-[var(--border-default)]',
          'bg-transparent text-[var(--text-primary)]',
          'hover:bg-[var(--bg-hover)]',
        ],
        success: [
          'border-transparent',
          'bg-[var(--success-500)] text-[var(--text-inverse)]',
          'hover:bg-[var(--success-600)]',
        ],
        warning: [
          'border-transparent',
          'bg-[var(--warning-500)] text-[var(--text-inverse)]',
          'hover:bg-[var(--warning-600)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }