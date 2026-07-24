import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { Stack, Inline, Grid } from '@/components/layout-primitives'
import { DataState, ChartSkeleton } from '@/components/data-state'
import { cn } from '@/lib/utils'
import * as React from 'react'

export function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} className='me-auto' />
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <Stack className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-[var(--text-heading)] font-bold tracking-tight'>Dashboard</h1>
          <Inline className='flex items-center space-x-2'>
            <Button>Download</Button>
          </Inline>
        </Stack>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <Grid cols={1} colsSm={2} colsLg={4} gap="md">
              <MetricCard
                title="Total Revenue"
                value="$45,231.89"
                change="+20.1% from last month"
                icon={<RevenueIcon />}
              />
              <MetricCard
                title="Subscriptions"
                value="+2,350"
                change="+180.1% from last month"
                icon={<SubscriptionsIcon />}
              />
              <MetricCard
                title="Sales"
                value="+12,234"
                change="+19% from last month"
                icon={<SalesIcon />}
              />
              <MetricCard
                title="Active Now"
                value="+573"
                change="+201 since last hour"
                icon={<ActiveIcon />}
              />
            </Grid>
            <Grid cols={1} colsLg={7} gap="md">
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='ps-2'>
                  <DataState
                    data={null}
                    isLoading={false}
                    skeleton={<ChartSkeleton />}
                  >
                    {() => <Overview />}
                  </DataState>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </Grid>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

function MetricCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <div className='h-4 w-4 text-[var(--text-tertiary)]'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-[var(--text-primary)]'>{value}</div>
        <p className='text-[var(--text-micro)] text-[var(--text-tertiary)]'>{change}</p>
      </CardContent>
    </Card>
  )
}

function RevenueIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4'>
      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
    </svg>
  )
}

function SubscriptionsIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4'>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  )
}

function SalesIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4'>
      <rect width='20' height='14' x='2' y='5' rx='2' />
      <path d='M2 10h20' />
    </svg>
  )
}

function ActiveIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4'>
      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
    </svg>
  )
}

const topNav = [
  { title: 'Overview', href: 'dashboard/overview', isActive: true, disabled: false },
  { title: 'Customers', href: 'dashboard/customers', isActive: false, disabled: true },
  { title: 'Products', href: 'dashboard/products', isActive: false, disabled: true },
  { title: 'Settings', href: 'dashboard/settings', isActive: false, disabled: true },
]