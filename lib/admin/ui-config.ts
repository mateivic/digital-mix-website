/**
 * Admin UI Configuration
 * 
 * Centralized configuration for admin panel styling.
 * Modify these values to customize the admin appearance.
 */

export const adminUIConfig = {
  // Brand
  brand: {
    name: 'Blog Admin',
    logo: '/logo-digitalmix.svg', // Set to null to show text only
  },

  // Colors (Tailwind classes or custom values)
  colors: {
    // Primary accent color
    primary: '#dc7d12',
    primaryHover: '#c46e0f',
    
    // Background colors
    bgMain: '#0f0f0f',
    bgCard: '#1a1a1a',
    bgHover: '#252525',
    bgInput: '#1f1f1f',
    
    // Text colors
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
    textMuted: '#666666',
    
    // Status colors
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Border colors
    border: '#2a2a2a',
    borderFocus: '#dc7d12',
  },

  // Typography
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontFamilyMono: 'ui-monospace, monospace',
  },

  // Spacing & Sizing
  layout: {
    sidebarWidth: '260px',
    headerHeight: '64px',
    contentMaxWidth: '1200px',
    borderRadius: '12px',
    borderRadiusSmall: '8px',
  },

  // Transitions
  transitions: {
    default: '150ms ease',
    slow: '300ms ease',
  },
}

// CSS Custom Properties for use in components
export const adminCSSVariables = `
  :root {
    --admin-primary: ${adminUIConfig.colors.primary};
    --admin-primary-hover: ${adminUIConfig.colors.primaryHover};
    --admin-bg-main: ${adminUIConfig.colors.bgMain};
    --admin-bg-card: ${adminUIConfig.colors.bgCard};
    --admin-bg-hover: ${adminUIConfig.colors.bgHover};
    --admin-bg-input: ${adminUIConfig.colors.bgInput};
    --admin-text-primary: ${adminUIConfig.colors.textPrimary};
    --admin-text-secondary: ${adminUIConfig.colors.textSecondary};
    --admin-text-muted: ${adminUIConfig.colors.textMuted};
    --admin-success: ${adminUIConfig.colors.success};
    --admin-warning: ${adminUIConfig.colors.warning};
    --admin-error: ${adminUIConfig.colors.error};
    --admin-info: ${adminUIConfig.colors.info};
    --admin-border: ${adminUIConfig.colors.border};
    --admin-border-focus: ${adminUIConfig.colors.borderFocus};
    --admin-sidebar-width: ${adminUIConfig.layout.sidebarWidth};
    --admin-header-height: ${adminUIConfig.layout.headerHeight};
    --admin-radius: ${adminUIConfig.layout.borderRadius};
    --admin-radius-sm: ${adminUIConfig.layout.borderRadiusSmall};
  }
`

// Helper to generate inline styles
export const adminStyles = {
  card: {
    backgroundColor: adminUIConfig.colors.bgCard,
    borderRadius: adminUIConfig.layout.borderRadius,
    border: `1px solid ${adminUIConfig.colors.border}`,
  },
  input: {
    backgroundColor: adminUIConfig.colors.bgInput,
    border: `1px solid ${adminUIConfig.colors.border}`,
    borderRadius: adminUIConfig.layout.borderRadiusSmall,
    color: adminUIConfig.colors.textPrimary,
  },
  button: {
    primary: {
      backgroundColor: adminUIConfig.colors.primary,
      color: '#ffffff',
      borderRadius: adminUIConfig.layout.borderRadiusSmall,
    },
    secondary: {
      backgroundColor: adminUIConfig.colors.bgHover,
      color: adminUIConfig.colors.textPrimary,
      border: `1px solid ${adminUIConfig.colors.border}`,
      borderRadius: adminUIConfig.layout.borderRadiusSmall,
    },
  },
}

