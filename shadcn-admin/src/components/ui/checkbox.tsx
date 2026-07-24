import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        [
          'peer size-4 shrink-0',
          'rounded-[var(--radius-sm)]',
          'border border-[var(--border-input)]',
          'shadow-[var(--shadow-card)]',
          'transition-[color,background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-default)]',
          'outline-none',
          'focus-visible:border-[var(--border-focus)]',
          'focus-visible:ring-[var(--focus-ring-width)]',
          'focus-visible:ring-[var(--focus-ring)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-[var(--border-error)]',
          'aria-invalid:ring-[var(--border-error)] aria-invalid:ring-opacity-20',
          'data-[state=checked]:border-[var(--primary-500)]',
          'data-[state=checked]:bg-[var(--primary-500)]',
          'data-[state=checked]:text-[var(--text-inverse)]',
          'dark:bg-[var(--bg-elevated)]',
          'dark:aria-invalid:ring-[var(--border-error)] aria-invalid:ring-opacity-40',
        ],
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }