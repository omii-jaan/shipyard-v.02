import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataStateProps<T> {
  data: T | null
  isLoading?: boolean
  error?: Error | null
  emptyMessage?: string
  emptyAction?: React.ReactNode
  children: (data: T) => React.ReactNode
  skeleton?: React.ReactNode
}

export function DataState<T>({
  data,
  isLoading = false,
  error = null,
  emptyMessage = 'No data available',
  emptyAction,
  children,
  skeleton,
}: DataStateProps<T>) {
  if (isLoading) {
    return (
      <div data-testid='loading-state' role='status' aria-live='polite'>
        {skeleton ?? <DefaultSkeleton />}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant='destructive' data-testid='error-state'>
        <AlertTitle>Failed to load</AlertTitle>
        <AlertDescription>{error.message ?? 'An unexpected error occurred'}</AlertDescription>
        <div className='mt-3'>
          <Button variant='outline' size='sm' onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </Alert>
    )
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-[var(--gap-2xl)] text-center', 'space-y-[var(--gap-md)]')} data-testid='empty-state'>
        <svg
          className='h-12 w-12 text-[var(--text-tertiary)]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
        </svg>
        <div className='space-y-1'>
          <p className='text-[var(--text-body-sm)] font-medium text-[var(--text-secondary)]'>No data found</p>
          <p className='text-[var(--text-body-sm)] text-[var(--text-tertiary)]'>{emptyMessage}</p>
        </div>
        {emptyAction && <div className='mt-[var(--gap-sm)]'>{emptyAction}</div>}
      </div>
    )
  }

  return <>{children(data)}</>
}

function DefaultSkeleton() {
  return (
    <div className='space-y-[var(--gap-md)]'>
      <Skeleton className='h-6 w-1/4' />
      <Skeleton className='h-4 w-3/4' />
      <Skeleton className='h-4 w-1/2' />
    </div>
  )
}

export function MetricCardSkeleton() {
  return (
    <div className='space-y-[var(--gap-sm)]'>
      <Skeleton className='h-4 w-1/3' />
      <Skeleton className='h-8 w-1/4' />
      <Skeleton className='h-3 w-1/2' />
    </div>
  )
}

export function CardSkeleton({ title = true, contentLines = 3 }: { title?: boolean; contentLines?: number } = {}) {
  return (
    <div className='space-y-[var(--gap-md)]'>
      {title && <Skeleton className='h-5 w-1/3' />}
      {Array.from({ length: contentLines }).map((_, i) => (
        <Skeleton key={i} className='h-4 w-full' />
      ))}
    </div>
  )
}

export function TableSkeleton({ columns = 4, rows = 5 }: { columns?: number; rows?: number } = {}) {
  return (
    <div className='space-y-[var(--gap-xs)]'>
      <div className='grid gap-[var(--gap-sm)]' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className='h-4 w-full' />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className='grid gap-[var(--gap-sm)]' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, col) => (
            <Skeleton key={col} className='h-8 w-full' />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton({ height = 300 }: { height?: number } = {}) {
  return (
    <div style={{ height }} className='relative'>
      <Skeleton className='absolute inset-0' />
    </div>
  )
}

export function ListSkeleton({ items = 5, showAvatar = true }: { items?: number; showAvatar?: boolean } = {}) {
  return (
    <div className='space-y-[var(--gap-sm)]'>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className='flex items-center gap-[var(--gap-md)]'>
          {showAvatar && <Skeleton className='h-9 w-9 rounded-full' />}
          <div className='flex-1 space-y-1'>
            <Skeleton className='h-4 w-1/3' />
            <Skeleton className='h-3 w-1/2' />
          </div>
          <Skeleton className='h-4 w-20' />
        </div>
      ))}
    </div>
  )
}