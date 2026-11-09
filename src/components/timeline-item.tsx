import { StyleSheet, View } from 'react-native';

import { AppSymbol } from '@/components/app-symbol';
import { PressableRow } from '@/components/pressable-row';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, withAlpha } from '@/constants/theme';
import type { AppIcon } from '@/data/resume';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  icon: AppIcon;
  title: string;
  subtitle: string;
  meta: string;
  accentColor?: string;
  /** Draws the connector line to the next item. */
  showConnector?: boolean;
  onPress?: () => void;
  accessibilityHint?: string;
};

/** A timeline entry with an icon node, connector line and optional navigation. */
export function TimelineItem({
  icon,
  title,
  subtitle,
  meta,
  accentColor,
  showConnector,
  onPress,
  accessibilityHint,
}: Props) {
  const theme = useTheme();
  const accent = accentColor ?? theme.tint;
  const nodeBackground = accentColor ? withAlpha(accentColor, 0.16) : theme.fill;

  const content = (
    <>
      <View style={styles.rail}>
        <View style={[styles.node, { backgroundColor: nodeBackground }]}>
          <AppSymbol icon={icon} size={18} color={accent} />
        </View>
        {showConnector ? (
          <View style={[styles.connector, { backgroundColor: theme.separator }]} />
        ) : null}
      </View>
      <View style={[styles.body, showConnector && styles.bodyWithConnector]}>
        <ThemedText type="headline">{title}</ThemedText>
        <ThemedText type="subheadline" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
        <ThemedText type="footnote" themeColor="textTertiary">
          {meta}
        </ThemedText>
      </View>
      {onPress ? (
        <View style={styles.chevron}>
          <AppSymbol
            icon={{ ios: 'chevron.right', android: 'chevron_right' }}
            size={14}
            color={theme.textTertiary}
          />
        </View>
      ) : null}
    </>
  );

  if (!onPress) {
    return <View style={styles.row}>{content}</View>;
  }

  return (
    <PressableRow
      style={styles.row}
      accessibilityRole="link"
      accessibilityLabel={`${title}, ${subtitle}, ${meta}`}
      accessibilityHint={accessibilityHint}
      onPress={onPress}>
      {content}
    </PressableRow>
  );
}

const NODE_SIZE = 36;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.three - Spacing.one,
  },
  rail: {
    alignItems: 'center',
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    flex: 1,
    width: 2,
    marginTop: Spacing.one,
    // extend through the gap between items (Career card uses Spacing.four)
    marginBottom: -Spacing.four + Spacing.one,
    borderRadius: 1,
  },
  body: {
    flex: 1,
    gap: Spacing.half,
    paddingTop: Spacing.half,
  },
  bodyWithConnector: {
    paddingBottom: Spacing.two,
  },
  chevron: {
    justifyContent: 'center',
  },
});
