import * as React from 'react'
import { cn } from '@/lib/utils'

export function Stack({
  className,
  size = 'md',
  align = 'stretch',
  divide = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  divide?: boolean;
}) {
  const gapMap = {
    none: '0',
    xs: 'var(--gap-xs)',
    sm: 'var(--gap-sm)',
    md: 'var(--gap-md)',
    lg: 'var(--gap-lg)',
    xl: 'var(--gap-xl)',
    '2xl': 'var(--gap-2xl)',
  } as const;

  const childArray = React.Children.toArray(children);
  const childrenWithDividers = divide
    ? childArray.flatMap((child, index) => [
        child,
        index < childArray.length - 1 ? (
          <div
            key={`divider-${index}`}
            className={cn(
              'w-full border-t',
              'border-[var(--border-subtle)]'
            )}
          />
        ) : null,
      ])
    : childArray;

  return (
    <div
      className={cn(
        'flex flex-col',
        `gap-[${gapMap[size]}]`,
        `items-${align}`,
        className
      )}
      {...props}
    >
      {childrenWithDividers}
    </div>
  );
}