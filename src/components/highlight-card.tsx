import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { AppSymbol } from '@/components/app-symbol';
import { CardSurface } from '@/components/section-card';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, withAlpha } from '@/constants/theme';
import type { AppIcon } from '@/data/resume';
import { useTheme } from '@/hooks/use-theme';
import { enterAnimation } from '@/lib/motion';

type Props = {
  icon: AppIcon;
  title: string;
  text: string;
  accentColor?: string;
  /** Position in its list, used to stagger the entering animation. */
  index?: number;
  children?: React.ReactNode;
};

/** Card with an icon tile, title and descriptive text. */
export function HighlightCard({ icon, title, text, accentColor, index = 0, children }: Props) {
  const theme = useTheme();
  const accent = accentColor ?? theme.tint;
  const tileBackground = accentColor ? withAlpha(accentColor, 0.16) : theme.fill;

  return (
    <Animated.View entering={enterAnimation(index)}>
      <CardSurface style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconTile, { backgroundColor: tileBackground }]}>
            <AppSymbol icon={icon} size={18} color={accent} />
          </View>
          <ThemedText type="headline" style={styles.title}>
            {title}
          </ThemedText>
        </View>
        <ThemedText type="subheadline" themeColor="textSecondary">
          {text}
        </ThemedText>
        {children}
      </CardSurface>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three - Spacing.one,
  },
  iconTile: {
    width: 34,
    height: 34,
    borderRadius: Radius.small + 2,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
  },
});
