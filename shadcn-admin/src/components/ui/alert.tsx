import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  [
    'relative w-full',
    'rounded-[var(--radius-card)]',
    'border',
    'p-[var(--pad-md)]',
    'text-[var(--text-body-sm)]',
    'grid has-[>svg]:grid-cols-[calc(var(--space-4)*4)_1fr] grid-cols-[0_1fr]',
    'has-[>svg]:gap-x-[var(--gap-md)] gap-y-[var(--gap-xs)]',
    'items-start',
    '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    'duration-[var(--duration-fast)] ease-[var(--ease-default)]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--bg-surface-1)] text-[var(--text-primary)]',
          'border-[var(--border-default)]',
        ],
        destructive: [
          'bg-[var(--bg-error)] text-[var(--text-error)]',
          'border-[var(--border-error)]',
          '[&>svg]:text-current',
          '*:data-[slot=alert-description]:text-[var(--text-error)]',
        ],
        success: [
          'bg-[var(--bg-success)] text-[var(--text-success)]',
          'border-[var(--border-success)]',
          '[&>svg]:text-current',
          '*:data-[slot=alert-description]:text-[var(--text-success)]',
        ],
        warning: [
          'bg-[var(--bg-warning)] text-[var(--text-warning)]',
          'border-[var(--border-warning)]',
          '[&>svg]:text-current',
          '*:data-[slot=alert-description]:text-[var(--text-warning)]',
        ],
        info: [
          'bg-[var(--bg-info)] text-[var(--text-info)]',
          'border-[var(--border-info)]',
          '[&>svg]:text-current',
          '*:data-[slot=alert-description]:text-[var(--text-info)]',
],
        },
      },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot='alert'
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn(
        'col-start-2 grid justify-items-start gap-[var(--gap-xs)] text-[var(--text-body-sm)] [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }