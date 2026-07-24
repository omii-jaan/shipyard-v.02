import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnalyticsChart } from './analytics-chart'
import { Grid, Stack, Inline } from '@/components/layout-primitives'

export function Analytics() {
  return (
    <Stack size="lg">
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Weekly clicks and unique visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <AnalyticsChart />
        </CardContent>
      </Card>
      <Grid cols={1} colsSm={2} colsLg={4} gap="md">
        <MetricCard
          title="Total Clicks"
          value="1,248"
          change="+12.4% vs last week"
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-[var(--text-tertiary)]'
            >
              <path d='M3 3v18h18' />
              <path d='M7 15l4-4 4 4 4-6' />
            </svg>
          }
        />
        <MetricCard
          title="Unique Visitors"
          value="832"
          change="+5.8% vs last week"
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-[var(--text-tertiary)]'
            >
              <circle cx='12' cy='7' r='4' />
              <path d='M6 21v-2a6 6 0 0 1 12 0v2' />
            </svg>
          }
        />
        <MetricCard
          title="Bounce Rate"
          value="42%"
          change="-3.2% vs last week"
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-[var(--text-tertiary)]'
            >
              <path d='M3 12h6l3 6 3-6h6' />
            </svg>
          }
        />
        <MetricCard
          title="Avg. Session"
          value="3m 24s"
          change="+18s vs last week"
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-[var(--text-tertiary)]'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
          }
        />
      </Grid>
      <Grid cols={1} colsLg={7} gap="md">
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle>Referrers</CardTitle>
            <CardDescription>Top sources driving traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Direct', value: 512 },
                { name: 'Product Hunt', value: 238 },
                { name: 'Twitter', value: 174 },
                { name: 'Blog', value: 104 },
              ]}
              barClass='bg-[var(--primary-500)]'
              valueFormatter={(n) => `${n}`}
            />
          </CardContent>
        </Card>
        <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>How users access your app</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Desktop', value: 74 },
                { name: 'Mobile', value: 22 },
                { name: 'Tablet', value: 4 },
              ]}
              barClass='bg-[var(--text-tertiary)]'
              valueFormatter={(n) => `${n}%`}
            />
          </CardContent>
        </Card>
      </Grid>
    </Stack>
  )
}

function MetricCard({
  title,
  value,
  change,
  icon,
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-[var(--text-primary)]'>{value}</div>
        <p className='text-xs text-[var(--text-tertiary)]'>{change}</p>
      </CardContent>
    </Card>
  )
}

function SimpleBarList({
  items,
  valueFormatter,
  barClass,
}: {
  items: { name: string; value: number }[]
  valueFormatter: (n: number) => string
  barClass: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className='space-y-3'>
      {items.map((i) => {
        const width = `${Math.round((i.value / max) * 100)}%`
        return (
          <li key={i.name} className='flex items-center justify-between gap-3'>
            <div className='min-w-0 flex-1'>
              <div className='mb-1 truncate text-xs text-[var(--text-tertiary)]'>
                {i.name}
              </div>
              <div className='h-2.5 w-full rounded-full bg-[var(--bg-surface-2)]'>
                <div
                  className={`h-2.5 rounded-full ${barClass}`}
                  style={{ width }}
                />
              </div>
            </div>
            <div className='ps-2 text-xs font-medium tabular-nums'>
              {valueFormatter(i.value)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}