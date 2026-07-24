import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { DataState, ListSkeleton } from '@/components/data-state'

interface Sale {
  name: string
  email: string
  amount: string
  avatar: string
  initials: string
}

async function fetchSales(): Promise<Sale[]> {
  await new Promise(r => setTimeout(r, 400))
  return [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00', avatar: '/avatars/01.png', initials: 'OM' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00', avatar: '/avatars/02.png', initials: 'JL' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00', avatar: '/avatars/03.png', initials: 'IN' },
    { name: 'William Kim', email: 'will@email.com', amount: '+$99.00', avatar: '/avatars/04.png', initials: 'WK' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00', avatar: '/avatars/05.png', initials: 'SD' },
  ]
}

export function RecentSales() {
  const [sales, setSales] = React.useState<Sale[] | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let mounted = true
    fetchSales()
      .then(data => { if (mounted) { setSales(data); setIsLoading(false) } })
      .catch(err => { if (mounted) { setError(err instanceof Error ? err : new Error('Failed to load')); setIsLoading(false) } })
    return () => { mounted = false }
  }, [])

  return (
    <DataState
      data={sales}
      isLoading={isLoading}
      error={error}
      emptyMessage="No recent sales"
      skeleton={<ListSkeleton items={5} showAvatar />}
    >
      {(data) => (
        <div className={cn('space-y-4 divide-y divide-[var(--border-subtle)]')}>
          {data.map((sale, index) => (
            <div key={index} className={cn('flex items-center gap-4 py-2', index === 0 && 'pt-0')}>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatar} alt='Avatar' />
                <AvatarFallback>{sale.initials}</AvatarFallback>
              </Avatar>
              <div className='flex flex-1 flex-wrap items-center justify-between min-w-0'>
                <div className='space-y-1 min-w-0'>
                  <p className='text-[var(--text-body-sm)] font-medium truncate'>{sale.name}</p>
                  <p className='text-[var(--text-body-sm)] text-[var(--text-tertiary)] truncate'>{sale.email}</p>
                </div>
                <div className='font-medium text-[var(--text-body-sm)] whitespace-nowrap ms-2'>{sale.amount}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DataState>
  )
}