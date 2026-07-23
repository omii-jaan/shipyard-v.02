import { cn } from '@/lib/utils';

export function Container({
  className,
  size = 'xl',
  padding = 'md',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeMap = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  } as const;

  const paddingMap = {
    none: '0',
    sm: 'var(--inset-sm)',
    md: 'var(--inset-md)',
    lg: 'var(--inset-lg)',
    xl: 'var(--inset-xl)',
  } as const;

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