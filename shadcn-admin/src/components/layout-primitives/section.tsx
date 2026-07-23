import { cn } from '@/lib/utils';

export function Section({
  className,
  size = 'lg',
  children,
  ...props
}: React.HTMLAttributes<HTMLSectionElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeMap = {
    sm: 'var(--gap-lg)',
    md: 'var(--gap-xl)',
    lg: 'var(--gap-2xl)',
    xl: 'calc(var(--gap-2xl) * 1.5)',
  } as const;

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