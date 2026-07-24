import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({
  className,
  type,
  'aria-invalid': ariaInvalid,
  ...props
}: React.ComponentProps<'input'> & { 'aria-invalid'?: boolean | 'true' | 'false' }) {
  return (
    <input
      type={type}
      data-slot='input'
      aria-invalid={ariaInvalid}
      className={cn(
        'flex h-9 w-full min-w-0',
        'rounded-[var(--radius-input)]',
        'border border-[var(--border-input)]',
        'bg-transparent',
        'px-3 py-1',
        'text-[var(--text-body)]',
        'placeholder:text-[var(--text-placeholder)]',
        'shadow-[var(--shadow-card)]',
        'transition-[color,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-default)]',
        'outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-[var(--text-label)] file:font-medium',
        'selection:bg-[var(--primary-200)] selection:text-[var(--primary-900)]',
        'dark:selection:bg-[var(--primary-800)] dark:selection:text-[var(--primary-100)]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'dark:bg-[var(--bg-elevated)]',
        'focus-visible:border-[var(--border-focus)] focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring)]',
        'aria-invalid:border-[var(--border-error)] aria-invalid:ring-[var(--border-error)] aria-invalid:ring-opacity-20',
        className
      )}
      {...props}
    />
  )
}

export { Input }