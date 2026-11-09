/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { type ColorValue, PlatformColor } from 'react-native';

import { Colors, SystemColorNamesIOS, type ThemeColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type Palette = Record<ThemeColor, ColorValue>;

let iosPalette: Palette | undefined;

/** Built lazily: `PlatformColor` only exists on native platforms. */
function getIOSPalette(): Palette {
  iosPalette ??= Object.fromEntries(
    Object.entries(SystemColorNamesIOS).map(([key, name]) => [key, PlatformColor(name)])
  ) as Palette;
  return iosPalette;
}

/**
 * Returns the active color palette. iOS uses dynamic system colors that follow
 * light/dark mode and accessibility settings natively; other platforms use the
 * static palette for the current color scheme.
 */
export function useTheme(): Palette {
  const scheme = useColorScheme();
  if (process.env.EXPO_OS === 'ios') {
    return getIOSPalette();
  }
  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
