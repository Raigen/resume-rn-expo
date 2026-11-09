import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { Linking, StyleSheet, View } from 'react-native';

import { AppSymbol } from '@/components/app-symbol';
import { PressableRow } from '@/components/pressable-row';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import type { AppIcon } from '@/data/resume';
import { useTheme } from '@/hooks/use-theme';

export type ContactAction =
  | { type: 'email'; address: string }
  | { type: 'phone'; number: string }
  | { type: 'url'; url: string };

type Props = {
  icon: AppIcon;
  label: string;
  value: string;
  action?: ContactAction;
  /** Icon tile color; defaults to the system tint. */
  accentColor?: string;
};

async function runAction(action: ContactAction) {
  try {
    switch (action.type) {
      case 'email':
        await Linking.openURL(`mailto:${action.address}`);
        break;
      case 'phone':
        await Linking.openURL(`tel:${action.number.replace(/[^\d+]/g, '')}`);
        break;
      case 'url':
        await openBrowserAsync(action.url, {
          presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
        });
        break;
    }
  } catch {
    // No handler available (e.g. no mail app / simulator without phone) — ignore.
  }
}

/** A contact line (icon, label, value). Tapping it opens mail, phone or the in-app browser. */
export function ContactRow({ icon, label, value, action, accentColor }: Props) {
  const theme = useTheme();
  const tile = accentColor ?? theme.tint;

  const content = (
    <>
      <View style={[styles.iconTile, { backgroundColor: tile }]}>
        <AppSymbol icon={icon} size={16} color="#FFFFFF" />
      </View>
      <View style={styles.text}>
        <ThemedText type="footnote" themeColor="textSecondary">
          {label}
        </ThemedText>
        <ThemedText type="callout" numberOfLines={1}>
          {value}
        </ThemedText>
      </View>
      {action ? (
        <AppSymbol
          icon={
            action.type === 'url'
              ? { ios: 'arrow.up.right', android: 'open_in_new' }
              : { ios: 'chevron.right', android: 'chevron_right' }
          }
          size={14}
          color={theme.textTertiary}
        />
      ) : null}
    </>
  );

  if (!action) {
    return (
      <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
        {content}
      </View>
    );
  }

  return (
    <PressableRow
      style={styles.row}
      accessibilityRole={action.type === 'url' ? 'link' : 'button'}
      accessibilityLabel={`${label}: ${value}`}
      onPress={() => runAction(action)}>
      {content}
    </PressableRow>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three - Spacing.one,
    minHeight: 44,
  },
  iconTile: {
    width: 30,
    height: 30,
    borderRadius: Radius.small,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
});
