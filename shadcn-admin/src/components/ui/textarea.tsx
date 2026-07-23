import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({
  className,
  'aria-invalid': ariaInvalid,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      'aria-invalid'={ariaInvalid}
      className={cn(
        'flex field-sizing-content min-h-16 w-full',
        'rounded-[var(--radius-input)]',
        'border border-[var(--border-input)]',
        'bg-transparent',
        'px-3 py-2',
        'text-[var(--text-body)]',
        'placeholder:text-[var(--text-placeholder)]',
        'shadow-[var(--shadow-card)]',
        'transition-[color,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-default)]',
        'outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-[var(--border-focus)]',
        'focus-visible:ring-[var(--focus-ring-width)]',
        'focus-visible:ring-[var(--focus-ring)]',
        'aria-invalid:border-[var(--border-error)]',
        'aria-invalid:ring-[var(--border-error)] aria-invalid:ring-opacity-20',
        'dark:bg-[var(--bg-elevated)]',
        'dark:aria-invalid:ring-[var(--border-error)] aria-invalid:ring-opacity-40',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }