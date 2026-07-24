import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-[var(--bg-surface-1)] p-[var(--pad-md)] [--cell-size:--spacing(8)]',
        'in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-[var(--gap-md)] md:flex-row',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-[var(--gap-md)]', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-[var(--text-body-sm)] font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-[var(--radius-input)] border border-[var(--border-input)] shadow-[var(--shadow-card)]',
          'has-focus:border-[var(--border-focus)] has-focus:ring-[var(--focus-ring-width)] has-focus:ring-[var(--focus-ring)]',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'absolute inset-0 bg-[var(--bg-elevated)] opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'text-[var(--text-body-sm)]'
            : 'flex h-8 items-center gap-1 rounded-[var(--radius-button)] ps-2 pe-1 text-[var(--text-body-sm)] [&>svg]:size-3.5 [&>svg]:text-[var(--text-tertiary)]',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-[var(--radius-sm)] text-[0.8rem] font-normal text-[var(--text-tertiary)] select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] text-[var(--text-tertiary)] select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full p-0 text-center select-none [&:first-child[data-selected=true]_button]:rounded-l-[var(--radius-sm)] [&:last-child[data-selected=true]_button]:rounded-r-[var(--radius-sm)]',
          defaultClassNames.day
        ),
        range_start: cn(
          'rounded-l-[var(--radius-sm)] bg-[var(--bg-hover)]',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-[var(--radius-sm)] bg-[var(--bg-hover)]', defaultClassNames.range_end),
        today: cn(
          'rounded-[var(--radius-sm)] bg-[var(--primary-100)] text-[var(--primary-900)] data-[selected=true]:rounded-none',
          'dark:bg-[var(--primary-900)] dark:text-[var(--primary-100)]',
          defaultClassNames.today
        ),
        outside: cn(
          'text-[var(--text-tertiary)] aria-selected:text-[var(--text-tertiary)]',
          defaultClassNames.outside
        ),
        disabled: cn(
          'text-[var(--text-tertiary)] opacity-50',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot='calendar'
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className='flex size-(--cell-size) items-center justify-center text-center'>
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        [
          'flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal',
          'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10',
          'group-data-[focused=true]/day:border-[var(--border-focus)]',
          'group-data-[focused=true]/day:ring-[var(--focus-ring-width)] group-data-[focused=true]/day:ring-[var(--focus-ring)]',
          'data-[range-end=true]:rounded-[var(--radius-sm)] data-[range-end=true]:rounded-r-[var(--radius-sm)]',
          'data-[range-end=true]:bg-[var(--primary-500)] data-[range-end=true]:text-[var(--text-inverse)]',
          'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-[var(--bg-hover)] data-[range-middle=true]:text-[var(--text-primary)]',
          'data-[range-start=true]:rounded-[var(--radius-sm)] data-[range-start=true]:rounded-l-[var(--radius-sm)]',
          'data-[range-start=true]:bg-[var(--primary-500)] data-[range-start=true]:text-[var(--text-inverse)]',
          'data-[selected-single=true]:bg-[var(--primary-500)] data-[selected-single=true]:text-[var(--text-inverse)]',
          'dark:hover:text-[var(--text-primary)]',
          '[&>span]:text-[var(--text-micro)] [&>span]:opacity-70',
        ],
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }