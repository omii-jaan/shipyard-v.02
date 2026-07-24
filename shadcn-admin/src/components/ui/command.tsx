import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot='command'
      className={cn(
        'flex h-full w-full flex-col overflow-hidden',
        'rounded-[var(--radius-card)]',
        'bg-[var(--bg-elevated)] text-[var(--text-primary)]',
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command className={cn(
          '**:data-[slot=command-input-wrapper]:h-12',
          '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
          '[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5',
          '[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
          '**:[[cmdk-group-heading]]:px-[var(--gap-sm)]',
          '**:[[cmdk-group-heading]]:font-medium',
          '**:[[cmdk-group-heading]]:text-[var(--text-tertiary)]',
          '**:[[cmdk-group]]:px-[var(--gap-sm)]',
          '**:[[cmdk-input]]:h-12',
          '**:[[cmdk-item]]:px-[var(--gap-sm)]',
          '**:[[cmdk-item]]:py-[var(--gap-sm)]',
        )}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot='command-input-wrapper'
      className={cn(
        'flex h-9 items-center gap-2 border-b px-[var(--gap-md)]',
        'border-[var(--border-subtle)]'
      )}
    >
      <SearchIcon className='size-4 shrink-0 opacity-50' />
      <CommandPrimitive.Input
        data-slot='command-input'
        className={cn(
          'flex h-10 w-full rounded-[var(--radius-input)] bg-transparent py-3',
          'text-[var(--text-body-sm)]',
          'outline-none',
          'placeholder:text-[var(--text-tertiary)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot='command-list'
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot='command-empty'
      className='py-[var(--gap-lg)] text-center text-[var(--text-body-sm)] text-[var(--text-tertiary)]'
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot='command-group'
      className={cn(
        'overflow-hidden p-[var(--gap-xs)]',
        'text-[var(--text-primary)]',
        '**:[[cmdk-group-heading]]:px-[var(--gap-sm)]',
        '**:[[cmdk-group-heading]]:py-[var(--gap-xs)]',
        '**:[[cmdk-group-heading]]:text-[var(--text-caption)]',
        '**:[[cmdk-group-heading]]:font-medium',
        '**:[[cmdk-group-heading]]:text-[var(--text-tertiary)]',
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot='command-separator'
      className={cn('-mx-1 h-px bg-[var(--border-subtle)]', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot='command-item'
      className={cn(
        "relative flex cursor-default items-center gap-2",
        'rounded-[var(--radius-sm)] px-[var(--gap-sm)] py-[var(--gap-xs)]',
        'text-[var(--text-body-sm)]',
        'outline-none select-none',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        'data-[selected=true]:bg-[var(--bg-hover)] data-[selected=true]:text-[var(--text-primary)]',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        '[&_svg:not([class*="size-"])]:size-4',
        '[&_svg:not([class*="text-"])]:text-[var(--text-tertiary)]',
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='command-shortcut'
      className={cn(
        'ms-auto text-[var(--text-micro)] tracking-widest text-[var(--text-tertiary)]',
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}