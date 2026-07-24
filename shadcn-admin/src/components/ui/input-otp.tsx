import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot='input-otp'
      containerClassName={cn(
        'flex items-center gap-[var(--gap-sm)] has-disabled:opacity-50',
        containerClassName
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='input-otp-group'
      className={cn('flex items-center', className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        [
          'relative flex h-9 w-9 items-center justify-center',
          'border-y border-r border-[var(--border-input)]',
          'text-[var(--text-body-sm)]',
          'shadow-[var(--shadow-card)]',
          'transition-[color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-default)]',
          'outline-none',
          'first:rounded-l-[var(--radius-input)] first:border-l',
          'last:rounded-r-[var(--radius-input)]',
          'aria-invalid:border-[var(--border-error)]',
          'data-[active=true]:z-10 data-[active=true]:border-[var(--border-focus)]',
          'data-[active=true]:ring-[var(--focus-ring-width)] data-[active=true]:ring-[var(--focus-ring)]',
          'data-[active=true]:aria-invalid:border-[var(--border-error)]',
          'data-[active=true]:aria-invalid:ring-[var(--border-error)] data-[active=true]:aria-invalid:ring-opacity-20',
          'dark:bg-[var(--bg-elevated)]',
          'dark:data-[active=true]:aria-invalid:ring-[var(--border-error)] data-[active=true]:aria-invalid:ring-opacity-40',
        ],
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-4 w-px animate-caret-blink bg-[var(--text-primary)] duration-1000' />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }