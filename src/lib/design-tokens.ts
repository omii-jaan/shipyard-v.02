/**
 * Shipyard Design Tokens — Single Source of Truth
 * All colors in HSL. All spacing in 4px increments.
 * Import this in tailwind.config.ts and CSS.
 */

export const tokens = {
  // Color palette — all HSL values
  colors: {
    // Core surfaces
    background: '222 25% 5%',
    foreground: '210 20% 94%',

    card: '222 22% 8%',
    cardForeground: '210 20% 94%',
    cardBorder: '222 18% 15%',

    popover: '222 22% 8%',
    popoverForeground: '210 20% 94%',

    // Brand colors
    primary: '183 100% 50%',        // Electric Cyan
    primaryForeground: '222 25% 5%',
    primaryHover: '183 100% 55%',
    primaryMuted: '183 100% 50% / 0.1',

    secondary: '270 60% 62%',       // Neon Purple
    secondaryForeground: '210 20% 94%',
    secondaryHover: '270 60% 68%',
    secondaryMuted: '270 60% 62% / 0.1',

    accent: '142 76% 55%',          // Neon Green
    accentForeground: '222 25% 5%',
    accentHover: '142 76% 60%',
    accentMuted: '142 76% 55% / 0.1',

    // Muted
    muted: '222 18% 13%',
    mutedForeground: '215 15% 55%',

    // Destructive
    destructive: '0 84% 60%',
    destructiveForeground: '210 20% 94%',
    destructiveMuted: '0 84% 60% / 0.1',

    // Borders & inputs
    border: '222 18% 15%',
    input: '222 18% 13%',
    ring: '183 100% 50%',

    // Semantic neon (for direct use)
    neon: {
      cyan: '183 100% 50%',
      purple: '270 60% 62%',
      green: '142 76% 55%',
      orange: '25 95% 53%',
    },

    // Sidebar
    sidebar: {
      background: '222 22% 7%',
      foreground: '210 20% 80%',
      primary: '183 100% 50%',
      primaryForeground: '222 25% 5%',
      accent: '222 18% 13%',
      accentForeground: '210 20% 94%',
      border: '222 18% 15%',
      ring: '183 100% 50%',
    },
  },

  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, hsl(222 25% 5%) 0%, hsl(240 20% 7%) 50%, hsl(222 25% 5%) 100%)',
    card: 'linear-gradient(145deg, hsl(222 22% 9%), hsl(222 22% 7%))',
    primary: 'linear-gradient(135deg, hsl(183 100% 50%), hsl(200 100% 60%))',
    secondary: 'linear-gradient(135deg, hsl(270 60% 62%), hsl(290 70% 55%))',
    shine: 'linear-gradient(135deg, hsl(183 100% 50% / 0.08), hsl(270 60% 62% / 0.08))',
    accent: 'linear-gradient(135deg, hsl(142 76% 55%), hsl(160 80% 50%))',
    destructive: 'linear-gradient(135deg, hsl(0 84% 60%), hsl(15 90% 55%))',
  },

  // Glows & shadows
  glows: {
    cyan: '0 0 30px hsl(183 100% 50% / 0.4)',
    cyanSoft: '0 0 20px hsl(183 100% 50% / 0.2)',
    cyanStrong: '0 0 40px hsl(183 100% 50% / 0.6)',
    purple: '0 0 30px hsl(270 60% 62% / 0.4)',
    purpleSoft: '0 0 20px hsl(270 60% 62% / 0.2)',
    green: '0 0 30px hsl(142 76% 55% / 0.4)',
    greenSoft: '0 0 20px hsl(142 76% 55% / 0.2)',
    orange: '0 0 30px hsl(25 95% 53% / 0.4)',
  },

  textGlows: {
    cyan: '0 0 20px hsl(183 100% 50% / 0.7)',
    purple: '0 0 20px hsl(270 60% 62% / 0.7)',
    green: '0 0 20px hsl(142 76% 55% / 0.7)',
  },

  // Typography
  typography: {
    fontFamilies: {
      sans: ['Space Grotesk', 'sans-serif'],
      display: ['Syne', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
    fontSizes: {
      xs: '0.625rem',    // 10px
      sm: '0.75rem',     // 12px
      base: '0.875rem',  // 14px
      lg: '1rem',        // 16px
      xl: '1.125rem',    // 18px
      '2xl': '1.25rem',  // 20px
      '3xl': '1.5rem',   // 24px
      '4xl': '2rem',     // 32px
      '5xl': '2.5rem',   // 40px
      '6xl': '3.5rem',   // 56px
      '7xl': '4.5rem',   // 72px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em',
      widest: '0.04em',
    },
  },

  // Spacing (4px base unit)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
    slower: '500ms ease-out',
    spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
    toast: 700,
    max: 9999,
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },

  // Container max widths
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    full: '100%',
  },

  // Animation durations
  animation: {
    instant: '0ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Opacity
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof tokens.colors;
export type GradientToken = keyof typeof tokens.gradients;
export type GlowToken = keyof typeof tokens.glows;
export type SpacingToken = keyof typeof tokens.spacing;
export type RadiusToken = keyof typeof tokens.borderRadius;
export type FontSizeToken = keyof typeof tokens.typography.fontSizes;
export type FontWeightToken = keyof typeof tokens.typography.fontWeights;
export type ZIndexToken = keyof typeof tokens.zIndex;