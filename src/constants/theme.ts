/**
 * Design tokens: colors (light + dark), typography, spacing and radii.
 * On iOS the palette resolves to dynamic system colors (see `useTheme`).
 */

import '@/global.css';

import { Platform } from 'react-native';

/** Fallback palette (Android / web) — mirrors the iOS system grouped palette. */
export const Colors = {
  light: {
    text: '#000000',
    textSecondary: '#6C6C70',
    textTertiary: '#8E8E93',
    background: '#F2F2F7',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E5E5EA',
    fill: '#7676801F',
    separator: '#C6C6C8',
    tint: '#007AFF',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#AEAEB2',
    textTertiary: '#8E8E93',
    background: '#000000',
    backgroundElement: '#1C1C1E',
    backgroundSelected: '#2C2C2E',
    fill: '#7676803D',
    separator: '#38383A',
    tint: '#0A84FF',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** iOS dynamic system colors (UIColor names) for each theme token. */
export const SystemColorNamesIOS: Record<ThemeColor, string> = {
  text: 'label',
  textSecondary: 'secondaryLabel',
  textTertiary: 'tertiaryLabel',
  background: 'systemGroupedBackground',
  backgroundElement: 'secondarySystemGroupedBackground',
  backgroundSelected: 'tertiarySystemGroupedBackground',
  fill: 'tertiarySystemFill',
  separator: 'separator',
  tint: 'systemBlue',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  small: 8,
  medium: 14,
  large: 22,
  pill: 999,
} as const;

export const MaxContentWidth = 800;

/** Appends an alpha channel (0–1) to a `#RRGGBB` color. */
export function withAlpha(hex: string, alpha: number) {
  const value = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex.slice(0, 7)}${value}`;
}
