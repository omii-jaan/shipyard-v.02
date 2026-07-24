module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce use of design system tokens instead of arbitrary values',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      useDesignToken: 'Use design token "{{token}}" instead of arbitrary value "{{value}}"',
      useSemanticToken: 'Use semantic token instead of raw color/spacing value',
    },
  },
  create(context) {
    const tokenMap = {
      // Colors
      '#ffffff': 'var(--bg-canvas)',
      '#fafafa': 'var(--bg-surface-1)',
      '#f4f4f4': 'var(--bg-surface-2)',
      '#e4e4e4': 'var(--bg-surface-3)',
      '#d4d4d4': 'var(--border-default)',
      '#a3a3a3': 'var(--border-strong)',
      '#737373': 'var(--border-emphasis)',
      '#525252': 'var(--text-tertiary)',
      '#404040': 'var(--text-secondary-dark)',
      '#262626': 'var(--text-primary-dark)',
      '#171717': 'var(--text-primary)',
      // Spacing
      '4px': 'var(--gap-xs)',
      '8px': 'var(--gap-sm)',
      '12px': 'var(--gap-md)',
      '16px': 'var(--gap-md)',
      '20px': 'var(--gap-lg)',
      '24px': 'var(--gap-lg)',
      '32px': 'var(--gap-xl)',
      '40px': 'var(--gap-2xl)',
      '48px': 'var(--gap-2xl)',
      '64px': 'var(--gap-2xl)',
      // Radius
      '2px': 'var(--radius-xs)',
      '4px': 'var(--radius-sm)',
      '6px': 'var(--radius-md)',
      '8px': 'var(--radius-lg)',
      '12px': 'var(--radius-xl)',
      '16px': 'var(--radius-2xl)',
      // Shadows
      '0 1px 2px': 'var(--shadow-card)',
      '0 2px 8px': 'var(--shadow-card-hover)',
      '0 4px 16px': 'var(--shadow-dropdown)',
      '0 8px 24px': 'var(--shadow-modal)',
      '0 16px 48px': 'var(--shadow-tooltip)',
    }

    const semanticTokens = {
      colors: ['bg-', 'border-', 'text-', 'primary-', 'error-', 'success-', 'warning-', 'info-'],
      spacing: ['gap-', 'pad-', 'inset-', 'space-'],
      radius: ['radius-'],
      shadow: ['shadow-'],
    }

    function checkValue(value) {
      if (!value || typeof value !== 'string') return null

      // Check for hardcoded values that should use tokens
      for (const [hardcoded, token] of Object.entries(tokenMap)) {
        if (value.includes(hardcoded)) {
          return { hardcoded, token }
        }
      }
      return null
    }

    return {
      Literal(node) {
        if (node.value && typeof node.value === 'string') {
          const match = checkValue(node.value)
          if (match) {
            context.report({
              node,
              messageId: 'useDesignToken',
              data: { token: match.token, value: match.hardcoded },
              fix(fixer) {
                return fixer.replaceText(node, node.raw.replace(match.hardcoded, match.token))
              },
            })
          }
        }
      },
      JSXAttribute(node) {
        if (node.value && node.value.type === 'Literal' && typeof node.value.value === 'string') {
          const match = checkValue(node.value.value)
          if (match) {
            context.report({
              node: node.value,
              messageId: 'useDesignToken',
              data: { token: match.token, value: match.hardcoded },
              fix(fixer) {
                return fixer.replaceText(node.value, node.value.raw.replace(match.hardcoded, match.token))
              },
            })
          }
        }
      },
    }
  },
}