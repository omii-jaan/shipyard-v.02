import { cn } from '@/lib/utils';

export function Grid({
  className,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 'md',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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

  const style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: gapMap[gap],
  };

  if (colsSm) {
    style['@media (min-width: 640px)'] = { gridTemplateColumns: `repeat(${colsSm}, minmax(0, 1fr))` };
  }
  if (colsMd) {
    style['@media (min-width: 768px)'] = { gridTemplateColumns: `repeat(${colsMd}, minmax(0, 1fr))` };
  }
  if (colsLg) {
    style['@media (min-width: 1024px)'] = { gridTemplateColumns: `repeat(${colsLg}, minmax(0, 1fr))` };
  }
  if (colsXl) {
    style['@media (min-width: 1280px)'] = { gridTemplateColumns: `repeat(${colsXl}, minmax(0, 1fr))` };
  }

  return (
    <div className={cn(className)} style={style} {...props}>
      {children}
    </div>
  );
}