# Shipyard Design System Tokens

**Source of truth for all design decisions. Every component, page, and pattern must reference these tokens.**

---

## 1. Color System

### 1.1 Gray Scale (10-step semantic scale)

Each step has a **specific semantic purpose** — never use raw steps directly in components.

| Step | Light (OKLCH) | Dark (OKLCH) | Semantic Role | CSS Variable |
|------|---------------|--------------|---------------|--------------|
| 100 | `oklch(1 0 0)` | `oklch(0.08 0.02 260)` | Default background | `--gray-100` |
| 200 | `oklch(0.98 0.005 260)` | `oklch(0.1 0.02 260)` | Hover background | `--gray-200` |
| 300 | `oklch(0.94 0.01 260)` | `oklch(0.14 0.02 260)` | Active/pressed background | `--gray-300` |
| 400 | `oklch(0.88 0.01 260)` | `oklch(0.22 0.02 260)` | Default border | `--gray-400` |
| 500 | `oklch(0.72 0.02 260)` | `oklch(0.45 0.02 260)` | Hover border | `--gray-500` |
| 600 | `oklch(0.55 0.02 260)` | `oklch(0.55 0.02 260)` | Active/focus border | `--gray-600` |
| 700 | `oklch(0.42 0.02 260)` | `oklch(0.65 0.02 260)` | High-contrast background | `--gray-700` |
| 800 | `oklch(0.32 0.02 260)` | `oklch(0.72 0.02 260)` | High-contrast hover | `--gray-800` |
| 900 | `oklch(0.22 0.02 260)` | `oklch(0.85 0.01 260)` | Secondary text/icons | `--gray-900` |
| 1000 | `oklch(0.12 0.02 260)` | `oklch(0.98 0 0)` | Primary text/icons | `--gray-1000` |

### 1.2 Semantic Color Aliases (USE THESE IN COMPONENTS)

```css
:root {
  /* Backgrounds */
  --bg-canvas: var(--gray-100);           /* Page background */
  --bg-surface-1: var(--gray-100);        /* Card, panel, modal background */
  --bg-surface-2: var(--gray-200);        /* Hover surface, striped rows */
  --bg-surface-3: var(--gray-300);        /* Active/pressed surface */
  --bg-elevated: var(--gray-100);         /* Dropdown, popover, tooltip */
  
  /* Borders */
  --border-subtle: var(--gray-300);       /* Dividers, hairline borders */
  --border-default: var(--gray-400);      /* Default component borders */
  --border-strong: var(--gray-500);       /* Hover borders, focus rings */
  --border-emphasis: var(--gray-600);     /* Active borders, error focus */
  
  /* Text */
  --text-primary: var(--gray-1000);       /* Headings, primary content */
  --text-secondary: var(--gray-900);      /* Body text, descriptions */
  --text-tertiary: var(--gray-700);       /* Captions, metadata, disabled */
  --text-inverse: var(--gray-100);        /* Text on dark backgrounds */
  --text-link: var(--primary-600);        /* Links */
  --text-link-hover: var(--primary-700);  /* Link hover */
  
  /* Interactive */
  --focus-ring: var(--primary-500);       /* Focus ring color */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-canvas: var(--gray-100);
    --bg-surface-1: var(--gray-100);
    --bg-surface-2: var(--gray-200);
    --bg-surface-3: var(--gray-300);
    --bg-elevated: var(--gray-200);
    
    --border-subtle: var(--gray-800);
    --border-default: var(--gray-700);
    --border-strong: var(--gray-600);
    --border-emphasis: var(--gray-500);
    
    --text-primary: var(--gray-100);
    --text-secondary: var(--gray-300);
    --text-tertiary: var(--gray-500);
    --text-inverse: var(--gray-900);
    --text-link: var(--primary-400);
    --text-link-hover: var(--primary-300);
    
    --focus-ring: var(--primary-400);
  }
}

[data-theme="light"] { /* light tokens */ }
[data-theme="dark"] { /* dark tokens */ }
```

### 1.3 Primary Scale (Blue - 10 steps)

| Step | Light | Dark | Use Case |
|------|-------|------|----------|
| 50 | `oklch(0.98 0.02 255)` | `oklch(0.15 0.03 255)` | Subtle backgrounds |
| 100 | `oklch(0.94 0.04 255)` | `oklch(0.2 0.05 255)` | Light backgrounds |
| 200 | `oklch(0.88 0.08 255)` | `oklch(0.28 0.08 255)` | Hover backgrounds |
| 300 | `oklch(0.78 0.12 255)` | `oklch(0.38 0.12 255)` | Active backgrounds |
| 400 | `oklch(0.65 0.16 255)` | `oklch(0.5 0.16 255)` | Borders, icons |
| 500 | `oklch(0.55 0.18 255)` | `oklch(0.62 0.18 255)` | **Primary actions, focus rings** |
| 600 | `oklch(0.48 0.18 255)` | `oklch(0.58 0.18 255)` | Primary hover |
| 700 | `oklch(0.4 0.16 255)` | `oklch(0.52 0.16 255)` | Primary active |
| 800 | `oklch(0.32 0.14 255)` | `oklch(0.45 0.14 255)` | Text on primary |
| 900 | `oklch(0.25 0.12 255)` | `oklch(0.38 0.12 255)` | High contrast text |

### 1.4 Semantic State Colors

```css
:root {
  /* Success (Green) */
  --success-500: oklch(0.55 0.15 145);
  --success-600: oklch(0.48 0.14 145);
  --success-bg: oklch(0.95 0.03 145);
  --success-border: oklch(0.75 0.1 145);
  --success-text: oklch(0.35 0.12 145);
  
  /* Warning (Amber) */
  --warning-500: oklch(0.72 0.18 85);
  --warning-600: oklch(0.65 0.18 85);
  --warning-bg: oklch(0.97 0.05 85);
  --warning-border: oklch(0.8 0.15 85);
  --warning-text: oklch(0.4 0.12 85);
  
  /* Error/Destructive (Red) */
  --error-500: oklch(0.55 0.22 25);
  --error-600: oklch(0.48 0.2 25);
  --error-bg: oklch(0.97 0.03 25);
  --error-border: oklch(0.8 0.15 25);
  --error-text: oklch(0.35 0.15 25);
  
  /* Info (Blue) */
  --info-500: oklch(0.55 0.18 255);
  --info-600: oklch(0.48 0.16 255);
  --info-bg: oklch(0.95 0.03 255);
  --info-border: oklch(0.75 0.12 255);
  --info-text: oklch(0.35 0.14 255);
}
```

---

## 2. Spacing System

**Base unit: 4px** — All spacing is multiples of 4px.

| Token | Value | Rem | Use Case |
|-------|-------|-----|----------|
| `--space-0` | 0 | 0 | Reset |
| `--space-1` | 4px | 0.25rem | Micro gaps (icon+text) |
| `--space-2` | 8px | 0.5rem | Tight gaps (form fields, button groups) |
| `--space-3` | 12px | 0.75rem | Small gaps (card padding) |
| `--space-4` | 16px | 1rem | **Base unit** — default gaps, padding |
| `--space-5` | 20px | 1.25rem | Medium gaps |
| `--space-6` | 24px | 1.5rem | Section gaps, card gaps |
| `--space-8` | 32px | 2rem | Large section gaps |
| `--space-10` | 40px | 2.5rem | Page section gaps |
| `--space-12` | 48px | 3rem | Major layout gaps |
| `--space-16` | 64px | 4rem | Hero sections |

### Semantic Spacing Aliases

```css
:root {
  --gap-xs: var(--space-1);     /* 4px  - icon + label */
  --gap-sm: var(--space-2);     /* 8px  - button group, inline items */
  --gap-md: var(--space-4);     /* 16px - default stack gap, form field gap */
  --gap-lg: var(--space-6);     /* 24px - card internal gap, section gap */
  --gap-xl: var(--space-8);     /* 32px - major section gap */
  --gap-2xl: var(--space-12);   /* 48px - page section gap */
  
  --pad-xs: var(--space-1);     /* 4px  - badge, chip padding */
  --pad-sm: var(--space-2);     /* 8px  - button padding, input padding */
  --pad-md: var(--space-4);     /* 16px - card padding, container padding */
  --pad-lg: var(--space-6);     /* 24px - modal padding, large card */
  --pad-xl: var(--space-8);     /* 32px - page padding */
  
  --inset-sm: var(--space-2);   /* 8px  - sidebar rail, tight inset */
  --inset-md: var(--space-4);   /* 16px - default container inset */
  --inset-lg: var(--space-6);   /* 24px - generous inset */
}
```

---

## 3. Typography System

### 3.1 Font Families

```css
:root {
  --font-sans: 'Geist', 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
  --font-display: 'Geist', 'Inter', system-ui, -apple-system, sans-serif;
}
```

### 3.2 Type Scale (Fluid with clamp)

| Role | Size (clamp) | Line Height | Weight | Letter Spacing | Use Case |
|------|--------------|-------------|--------|----------------|----------|
| `--text-display` | `clamp(2.5rem, 5vw, 4rem)` | 1.1 | 600 | -0.02em | Hero headlines |
| `--text-title` | `clamp(1.875rem, 3vw, 2.5rem)` | 1.2 | 600 | -0.01em | Page titles |
| `--text-heading` | `clamp(1.5rem, 2.5vw, 1.875rem)` | 1.3 | 600 | 0 | Section headings (H1) |
| `--text-heading-2` | `clamp(1.25rem, 2vw, 1.5rem)` | 1.3 | 600 | 0 | Subsections (H2) |
| `--text-heading-3` | `1.125rem` | 1.4 | 500 | 0 | Card titles (H3) |
| `--text-lede` | `1.125rem` | 1.6 | 400 | 0 | Intro paragraphs |
| `--text-body` | `1rem` | 1.6 | 400 | 0 | **Default body text** |
| `--text-body-sm` | `0.875rem` | 1.5 | 400 | 0 | Secondary body |
| `--text-label` | `0.875rem` | 1.5 | 500 | 0 | Form labels, button text |
| `--text-caption` | `0.75rem` | 1.5 | 400 | 0.01em | Captions, metadata |
| `--text-micro` | `0.6875rem` | 1.5 | 500 | 0.02em | Badges, status pills |

### 3.3 Monospace Variants

| Role | Size | Line Height | Use Case |
|------|------|-------------|----------|
| `--text-mono-lg` | `1rem` | 1.6 | Code blocks |
| `--text-mono` | `0.875rem` | 1.5 | Inline code, IDs |
| `--text-mono-sm` | `0.75rem` | 1.5 | Small code, timestamps |

---

## 4. Border Radius System

```css
:root {
  --radius-none: 0;
  --radius-xs: 2px;      /* Badges, chips, small pills */
  --radius-sm: 4px;      /* Buttons, inputs, small components */
  --radius-md: 6px;      /* Cards (default), dropdowns, popovers */
  --radius-lg: 8px;      /* Modals, large cards, sheets */
  --radius-xl: 12px;     /* Hero cards, feature cards */
  --radius-2xl: 16px;    /* Full-page modals, special surfaces */
  --radius-full: 9999px; /* Pills, avatars, circular buttons */
}
```

### Semantic Radius Aliases

```css
:root {
  --radius-button: var(--radius-sm);      /* 4px */
  --radius-input: var(--radius-sm);       /* 4px */
  --radius-card: var(--radius-md);        /* 6px */
  --radius-dropdown: var(--radius-md);    /* 6px */
  --radius-modal: var(--radius-lg);       /* 8px */
  --radius-tooltip: var(--radius-sm);     /* 4px */
  --radius-badge: var(--radius-full);     /* 9999px */
  --radius-avatar: var(--radius-full);    /* 9999px */
}
```

---

## 5. Shadow / Elevation System

**Philosophy: Elevation via surfaces, not shadows. Shadows only for true overlays.**

```css
:root {
  /* Surface-based elevation (preferred) */
  --elevation-0: none;                                    /* Flat on canvas */
  --elevation-1: 0 1px 2px rgb(0 0 0 / 0.03);            /* Card default */
  --elevation-2: 0 2px 8px rgb(0 0 0 / 0.05);            /* Card hover */
  --elevation-3: 0 4px 16px rgb(0 0 0 / 0.07);           /* Dropdown, popover */
  --elevation-4: 0 8px 24px rgb(0 0 0 / 0.08);           /* Modal, sheet */
  --elevation-5: 0 16px 48px rgb(0 0 0 / 0.1);           /* Tooltip, toast */
  
  /* Semantic aliases */
  --shadow-card: var(--elevation-1);
  --shadow-card-hover: var(--elevation-2);
  --shadow-dropdown: var(--elevation-3);
  --shadow-modal: var(--elevation-4);
  --shadow-tooltip: var(--elevation-5);
  --shadow-focus: 0 0 0 var(--focus-ring-width) var(--focus-ring);
  
  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --elevation-1: 0 1px 2px rgb(0 0 0 / 0.2);
      --elevation-2: 0 2px 8px rgb(0 0 0 / 0.3);
      --elevation-3: 0 4px 16px rgb(0 0 0 / 0.4);
      --elevation-4: 0 8px 24px rgb(0 0 0 / 0.5);
      --elevation-5: 0 16px 48px rgb(0 0 0 / 0.6);
    }
  }
}
```

---

## 6. Transition / Motion System

```css
:root {
  --duration-instant: 0ms;
  --duration-fast: 80ms;      /* Hover, simple transitions */
  --duration-normal: 120ms;   /* **Default** - focus, state changes */
  --duration-slow: 200ms;     /* Modals, drawers, complex */
  --duration-slower: 300ms;   /* Page transitions */
  
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);        /* Material standard */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);               /* Entering */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);              /* Exiting */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);    /* Bouncy */
  
  /* Semantic transitions */
  --transition-colors: color var(--duration-fast) var(--ease-default),
                       background-color var(--duration-fast) var(--ease-default),
                       border-color var(--duration-fast) var(--ease-default);
  --transition-shadow: box-shadow var(--duration-normal) var(--ease-default);
  --transition-transform: transform var(--duration-normal) var(--ease-default);
  --transition-all: var(--transition-colors), var(--transition-shadow), var(--transition-transform);
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    :root {
      --duration-fast: 0ms;
      --duration-normal: 0ms;
      --duration-slow: 0ms;
      --duration-slower: 0ms;
    }
  }
}
```

---

## 7. Z-Index Scale

```css
:root {
  --z-hide: -1;
  --z-base: 0;
  --z-dropdown: 100;      /* Dropdown menus, popovers */
  --z-sticky: 200;        /* Sticky headers, sidebars */
  --z-fixed: 300;         /* Fixed headers, bottom bars */
  --z-overlay: 400;       /* Modal backdrop */
  --z-modal: 500;         /* Modal dialog */
  --z-popover: 600;       /* Popover, tooltip */
  --z-toast: 700;         /* Toast notifications */
  --z-tooltip: 800;       /* Tooltip (highest) */
}
```

---

## 8. Breakpoints

```css
:root {
  --bp-sm: 640px;   /* Mobile landscape / small tablet */
  --bp-md: 768px;   /* Tablet portrait */
  --bp-lg: 1024px;  /* Tablet landscape / small desktop */
  --bp-xl: 1280px;  /* Desktop */
  --bp-2xl: 1536px; /* Large desktop */
}

/* Container queries for component-level responsiveness */
@container (width < 400px) { /* Compact */ }
@container (width >= 400px) { /* Regular */ }
@container (width >= 600px) { /* Wide */ }
```

---

## 9. Component State Matrix (Reference)

Every interactive component MUST implement these states:

| State | Visual Treatment | CSS Selector |
|-------|------------------|--------------|
| Default | Base tokens | `.btn` |
| Hover | `bg-surface-2`, `border-strong` | `.btn:hover` |
| Active/Pressed | `bg-surface-3`, `border-emphasis` | `.btn:active`, `.btn[data-state="active"]` |
| Focus (keyboard) | `focus-ring` + offset | `.btn:focus-visible` |
| Focus (mouse) | None (only keyboard) | N/A |
| Disabled | `opacity-50`, `cursor-not-allowed` | `.btn:disabled`, `.btn[aria-disabled]` |
| Loading | Spinner, text hidden, same dimensions | `.btn[data-loading]` |
| Error | `border-error`, `focus-ring: error` | `.btn[aria-invalid]` |
| Selected/Active | `bg-primary`, `text-primary-foreground` | `.btn[data-selected]`, `.btn[data-state="selected"]` |

---

## 10. Usage Rules (Enforced by ESLint)

1. **NO arbitrary values** in components — only design tokens
2. **NO raw colors** — use semantic aliases (`--bg-surface-1`, not `--gray-100`)
3. **NO raw spacing** — use semantic aliases (`--gap-md`, not `16px`)
4. **NO raw radii** — use semantic aliases (`--radius-card`, not `8px`)
5. **NO raw shadows** — use elevation tokens (`--shadow-card`, not `0 2px...`)
6. **NO raw font sizes** — use type roles (`--text-body`, not `1rem`)
7. **NO raw transitions** — use semantic transitions (`--transition-colors`)
8. **Every interactive element** must have `:focus-visible` styles
9. **Every form input** must have error, disabled, loading states
10. **Dark mode** must work via semantic tokens only (no component overrides)

---

## 11. Implementation Checklist

### Phase 1: Foundation Tokens
- [ ] Update `theme.css` with complete 10-step gray scale
- [ ] Add semantic color aliases
- [ ] Add spacing tokens
- [ ] Add typography tokens (fluid clamp)
- [ ] Add radius tokens
- [ ] Add shadow/elevation tokens
- [ ] Add transition tokens
- [ ] Add z-index tokens
- [ ] Verify dark mode via `@media` + `[data-theme]`

### Phase 2: Layout Primitives
- [ ] Create `Stack` component (vertical, gap tokens)
- [ ] Create `Inline` component (horizontal, gap tokens)
- [ ] Create `Grid` component (responsive columns)
- [ ] Create `Container` component (max-width, padding)
- [ ] Create `Section` component (semantic spacing)

### Phase 3: UI Component Audit
- [ ] Button — all states, variants, sizes
- [ ] Input — all states, label, error, helper
- [ ] Select — all states, native + custom
- [ ] Card — elevation, padding, header/content/footer
- [ ] Dialog/Modal — focus trap, backdrop, escape
- [ ] Dropdown/Popover — positioning, keyboard
- [ ] Tabs — keyboard nav, panels
- [ ] Table — sorting, selection, empty, loading
- [ ] Sidebar — collapse, mobile sheet, keyboard
- [ ] Toast/Sonner — positioning, stacking
- [ ] Tooltip — delay, positioning, arrow
- [ ] Avatar — sizes, fallback, group
- [ ] Badge — variants, sizes
- [ ] Separator — orientation, decorative
- [ ] Checkbox/Radio/Switch — states, labels
- [ ] Label — required, optional, error
- [ ] Form — validation, submission states

### Phase 4: Page-Level Patterns
- [ ] Dashboard — grid layout, metric cards, charts
- [ ] Settings — sections, forms, sidebar nav
- [ ] Profile — avatar, fields, verification states
- [ ] Auth — sign in/up, OTP, password reset
- [ ] Empty states — illustration, action, help
- [ ] Loading states — skeleton, spinner, progressive
- [ ] Error states — inline, page, toast

### Phase 5: Quality Gates
- [ ] ESLint rules for token usage
- [ ] Storybook/visual regression tests
- [ ] Accessibility audit (axe, keyboard, screen reader)
- [ ] Dark mode visual audit
- [ ] Responsive audit (320px - 1920px)
- [ ] Performance audit (bundle size, paint)

---

*This document is the single source of truth. Update here first, then implement in code.*