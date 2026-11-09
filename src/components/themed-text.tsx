import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextVariant =
  | 'largeTitle'
  | 'title'
  | 'title2'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subheadline'
  | 'footnote'
  | 'caption'
  | 'sectionHeader'
  | 'code';

export type ThemedTextProps = TextProps & {
  type?: TextVariant;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'body', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]} {...rest} />;
}

/** Type scale loosely following the iOS Human Interface Guidelines. */
const styles = StyleSheet.create({
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 700,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 700,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 700,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 600,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 400,
  },
  callout: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 400,
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 400,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 400,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
  },
  sectionHeader: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
