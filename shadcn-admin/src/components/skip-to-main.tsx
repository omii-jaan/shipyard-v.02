export function SkipToMain() {
  return (
    <a
      className={`
        fixed inset-s-44 z-999 -translate-y-52
        bg-[var(--primary-500)] px-4 py-2 text-sm font-medium whitespace-nowrap
        text-[var(--text-inverse)]
        opacity-95 shadow-[var(--shadow-card)]
        transition-[transform,background-color] duration-[var(--duration-fast)]
        hover:bg-[var(--primary-600)]
        focus:translate-y-3 focus:transform
        focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring)]
      `}
      href='#content'
    >
      Skip to Main
    </a>
  )
}