import { GlassView } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { glassEnabled } from '@/lib/glass';
import { enterAnimation } from '@/lib/motion';

type CardSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Optional tint for the surface (e.g. a company accent with alpha). */
  tintColor?: string;
};

/**
 * Rounded card surface. Uses Liquid Glass on iOS 26+ and a plain themed card
 * everywhere else.
 */
export function CardSurface({ children, style, tintColor }: CardSurfaceProps) {
  const theme = useTheme();

  if (glassEnabled) {
    return (
      <GlassView glassEffectStyle="regular" tintColor={tintColor} style={[styles.card, style]}>
        {children}
      </GlassView>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }, style]}>
      {tintColor ? (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: tintColor }]} />
      ) : null}
      {children}
    </View>
  );
}

type SectionCardProps = {
  title?: string;
  children: ReactNode;
  /** Position in the screen, used to stagger the entering animation. */
  index?: number;
  /** Render children directly (e.g. a list of cards) instead of in a single card. */
  bare?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/** A titled content section, rendered as a card with a subtle entering animation. */
export function SectionCard({ title, children, index = 0, bare, contentStyle }: SectionCardProps) {
  return (
    <Animated.View entering={enterAnimation(index)} style={styles.section}>
      {title ? (
        <ThemedText type="sectionHeader" themeColor="textSecondary" style={styles.title}>
          {title}
        </ThemedText>
      ) : null}
      {bare ? (
        <View style={[styles.bare, contentStyle]}>{children}</View>
      ) : (
        <CardSurface style={[styles.content, contentStyle]}>{children}</CardSurface>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.two,
  },
  title: {
    paddingHorizontal: Spacing.three,
  },
  card: {
    borderRadius: Radius.large,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  bare: {
    gap: Spacing.two,
  },
});
