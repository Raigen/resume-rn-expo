import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ChipProps = {
  label: string;
  accentColor?: string;
};

export function Chip({ label, accentColor }: ChipProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: accentColor ? withAlpha(accentColor, 0.14) : theme.fill },
      ]}>
      <ThemedText
        type="footnote"
        style={[styles.label, accentColor ? { color: accentColor } : undefined]}>
        {label}
      </ThemedText>
    </View>
  );
}

type ChipRowProps = {
  items: string[];
  accentColor?: string;
};

export function ChipRow({ items, accentColor }: ChipRowProps) {
  return (
    <View style={styles.row} accessibilityRole="list">
      {items.map((item) => (
        <Chip key={item} label={item} accentColor={accentColor} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingHorizontal: Spacing.three - Spacing.one,
    paddingVertical: Spacing.one + Spacing.half,
    borderRadius: Radius.pill,
  },
  label: {
    fontWeight: 600,
  },
});
