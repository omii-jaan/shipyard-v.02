import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot='sheet-overlay'
      className={cn(
        'fixed inset-0 z-[var(--z-overlay)] bg-black/50',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'duration-[var(--duration-normal)] ease-[var(--ease-default)]',
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}) {
  const sideStyles = {
    right: 'inset-y-0 inset-e-0 h-full w-[384px] max-w-[90vw] border-s data-[state=closed]:slide-out-to-end data-[state=open]:slide-in-from-end',
    left: 'inset-y-0 inset-s-0 h-full w-[384px] max-w-[90vw] border-e data-[state=closed]:slide-out-to-start data-[state=open]:slide-in-from-start',
    top: 'inset-x-0 top-0 h-auto max-h-[90vh] border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
    bottom: 'inset-x-0 bottom-0 h-auto max-h-[90vh] border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={cn(
          'fixed z-[var(--z-modal)] flex flex-col gap-[var(--gap-lg)]',
          'bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-[var(--shadow-modal)]',
          'transition-transform duration-[var(--duration-slow)] ease-[var(--ease-in)]',
          'data-[state=closed]:animate-out data-[state=closed]:duration-[var(--duration-slow)]',
          'data-[state=open]:animate-in data-[state=open]:duration-[var(--duration-slower)]',
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot='sheet-close'
            className={cn(
              'absolute inset-e-4 top-4 rounded-[var(--radius-sm)]',
              'opacity-70 transition-opacity hover:opacity-100',
              'focus-visible:ring-[var(--focus-ring-width)]',
              'focus-visible:ring-[var(--focus-ring)]',
              'focus-visible:ring-offset-[var(--focus-ring-offset)]',
              'focus-visible:ring-offset-[var(--bg-elevated)]',
              'disabled:pointer-events-none',
              '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4'
            )}
          >
            <XIcon />
            <span className='sr-only'>Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-header'
      className={cn('flex flex-col gap-[var(--gap-sm)] p-[var(--pad-lg)]', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-footer'
      className={cn('mt-auto flex flex-col gap-[var(--gap-sm)] p-[var(--pad-lg)]', className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot='sheet-title'
      className={cn('text-[var(--text-heading-3)] font-semibold text-[var(--text-primary)]', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-[var(--text-body-sm)] text-[var(--text-tertiary)]', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}