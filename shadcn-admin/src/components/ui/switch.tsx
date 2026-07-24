import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        [
          'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center',
          'rounded-full',
          'border border-transparent',
          'shadow-[var(--shadow-card)]',
          'transition-[color,background-color,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-default)]',
          'outline-none',
          'focus-visible:border-[var(--border-focus)]',
          'focus-visible:ring-[var(--focus-ring-width)]',
          'focus-visible:ring-[var(--focus-ring)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-[var(--primary-500)]',
          'data-[state=unchecked]:bg-[var(--border-default)]',
          'dark:data-[state=unchecked]:bg-[var(--border-default)]',
        ],
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'pointer-events-none block size-4 rounded-full',
          'bg-[var(--bg-surface-1)]',
          'ring-[var(--focus-ring-width)] ring-[var(--border-subtle)]',
          'transition-transform duration-[var(--duration-normal)] ease-[var(--ease-default)]',
          'data-[state=checked]:translate-x-[calc(100%-2px)]',
          'data-[state=unchecked]:translate-x-0',
          'rtl:data-[state=checked]:-translate-x-[calc(100%-2px)]',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }