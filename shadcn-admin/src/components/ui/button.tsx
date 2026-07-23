import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-[var(--radius-button)]',
    'text-[var(--text-label)] font-medium',
    'transition-[color,background-color,border-color,box-shadow]',
    'duration-[var(--duration-normal)] ease-[var(--ease-default)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
    'outline-none focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-[var(--focus-ring-offset)]',
    'aria-invalid:ring-[var(--border-error)] aria-invalid:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--primary-500)] text-[var(--text-inverse)]',
          'shadow-[var(--shadow-card)]',
          'hover:bg-[var(--primary-600)]',
          'active:bg-[var(--primary-700)]',
        ],
        destructive: [
          'bg-[var(--error-500)] text-[var(--text-inverse)]',
          'shadow-[var(--shadow-card)]',
          'hover:bg-[var(--error-600)]',
          'active:bg-[var(--error-600)]',
          'focus-visible:ring-[var(--border-error)]',
        ],
        outline: [
          'border border-[var(--border-default)]',
          'bg-[var(--bg-surface-1)]',
          'text-[var(--text-primary)]',
          'shadow-[var(--shadow-card)]',
          'hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
          'dark:bg-[var(--bg-elevated)] dark:border-[var(--border-input)] dark:hover:bg-[var(--bg-hover)]',
        ],
        secondary: [
          'bg-[var(--bg-surface-2)] text-[var(--text-primary)]',
          'shadow-[var(--shadow-card)]',
          'hover:bg-[var(--bg-active)]',
          'active:bg-[var(--bg-active)]',
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
          'dark:hover:bg-[var(--bg-hover)]',
        ],
        link: [
          'text-[var(--text-link)] underline-offset-4',
          'hover:underline',
          'hover:text-[var(--text-link-hover)]',
        ],
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-[var(--radius-button)] gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-[var(--radius-button)] px-6 has-[>svg]:px-4',
        xl: 'h-12 rounded-[var(--radius-button)] px-8 has-[>svg]:px-5 text-base',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={props.disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className='animate-spin size-4'
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <path d='M21 12a9 9 0 1 1-6.219-8.56' />
        </svg>
      )}
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }