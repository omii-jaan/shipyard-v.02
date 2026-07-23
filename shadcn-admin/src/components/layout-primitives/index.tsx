import * as React from 'react';
import { cn } from '@/lib/utils';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  divide?: boolean;
  className?: string;
}

export function Stack({
  space = 'md',
  divide = false,
  className,
  children,
  ...props
}: StackProps) {
  const spaceMap = {
    xs: 'var(--gap-xs)',
    sm: 'var(--gap-sm)',
    md: 'var(--gap-md)',
    lg: 'var(--gap-lg)',
    xl: 'var(--gap-xl)',
    '2xl': 'var(--gap-2xl)',
  };

  const childArray = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  );

  return (
    <div
      className={cn('flex flex-col', divide && 'divide-y divide-border-subtle', className)}
      style={{ gap: spaceMap[space] } as React.CSSProperties}
      {...props}
    >
      {childArray.map((child, index) => (
        <div key={child.key ?? index}>{child}</div>
      ))}
    </div>
  );
}

interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
}

export function Inline({
  space = 'md',
  align = 'center',
  wrap = false,
  justify = 'start',
  className,
  children,
  ...props
}: InlineProps) {
  const spaceMap = {
    xs: 'var(--gap-xs)',
    sm: 'var(--gap-sm)',
    md: 'var(--gap-md)',
    lg: 'var(--gap-lg)',
    xl: 'var(--gap-xl)',
    '2xl': 'var(--gap-2xl)',
  };

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };

  return (
    <div
      className={cn('inline-flex', wrap && 'flex-wrap', className)}
      style={{
        gap: spaceMap[space],
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function Grid({
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 'md',
  className,
  children,
  ...props
}: GridProps) {
  const gapMap = {
    xs: 'var(--gap-xs)',
    sm: 'var(--gap-sm)',
    md: 'var(--gap-md)',
    lg: 'var(--gap-lg)',
    xl: 'var(--gap-xl)',
    '2xl': 'var(--gap-2xl)',
  };

  const style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: gapMap[gap],
  };

  if (colsSm) style['@media (min-width: 640px)'] = { gridTemplateColumns: `repeat(${colsSm}, minmax(0, 1fr))` };
  if (colsMd) style['@media (min-width: 768px)'] = { gridTemplateColumns: `repeat(${colsMd}, minmax(0, 1fr))` };
  if (colsLg) style['@media (min-width: 1024px)'] = { gridTemplateColumns: `repeat(${colsLg}, minmax(0, 1fr))` };
  if (colsXl) style['@media (min-width: 1280px)'] = { gridTemplateColumns: `repeat(${colsXl}, minmax(0, 1fr))` };

  return (
    <div className={cn(className)} style={style} {...props}>
      {children}
    </div>
  );
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Container({
  size = 'xl',
  padding = 'md',
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeMap = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  };

  const paddingMap = {
    none: '0',
    sm: 'var(--inset-sm)',
    md: 'var(--inset-md)',
    lg: 'var(--inset-lg)',
    xl: 'var(--inset-lg)',
  };

  return (
    <div
      className={cn('mx-auto w-full', className)}
      style={{
        maxWidth: sizeMap[size],
        paddingInline: paddingMap[padding],
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLSectionElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Section({
  size = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  const sizeMap = {
    sm: 'var(--gap-lg)',
    md: 'var(--gap-xl)',
    lg: 'var(--gap-2xl)',
    xl: 'calc(var(--gap-2xl) * 1.5)',
  };

  return (
    <section
      className={cn('w-full', className)}
      style={{ paddingBlock: sizeMap[size] } as React.CSSProperties}
      {...props}
    >
      {children}
    </section>
  );
}

export { Stack as FlexCol, Inline as FlexRow, Grid as GridLayout, Container as Wrapper, Section as PageSection };