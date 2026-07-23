import { cn } from '@/lib/utils';

export function Inline({
  className,
  size = 'md',
  align = 'center',
  wrap = false,
  justify = 'start',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
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

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  } as const;

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  } as const;

  return (
    <div
      className={cn(
        'inline-flex',
        wrap && 'flex-wrap',
        className
      )}
      style={{
        gap: gapMap[size],
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}